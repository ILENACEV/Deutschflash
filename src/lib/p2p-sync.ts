/**
 * P2P Sync via WebRTC - Offline Multi-Device Synchronization
 * 
 * This module provides peer-to-peer data synchronization between devices
 * using WebRTC. No server required - works completely offline!
 * 
 * Usage:
 * 1. Generate a connection code on Device A
 * 2. Enter the code on Device B
 * 3. Data syncs directly between devices
 */

import type { VocabularyWord, UserStats, LearningSession, Settings, CustomDeck } from './types';

export interface SyncData {
  vocabulary: VocabularyWord[];
  stats: UserStats;
  sessions: LearningSession[];
  settings: Settings;
  customDecks: CustomDeck[];
  lastModified: number;
}

export interface PeerConnection {
  id: string;
  status: 'connecting' | 'connected' | 'disconnected';
  onData?: (data: SyncData) => void;
  send?: (data: SyncData) => void;
  close?: () => void;
}

// Simple signaling using WebRTC
// Note: In a real implementation, you'd use a simple signaling server
// or local network discovery (mDNS/Bonjour)

let localPeerId: string | null = null;
let dataChannel: RTCDataChannel | null = null;
let peerConnection: RTCPeerConnection | null = null;

/**
 * Generate a unique peer ID for this device
 */
export function generatePeerId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  localPeerId = result;
  return result;
}

/**
 * Get the local peer ID
 */
export function getLocalPeerId(): string | null {
  return localPeerId;
}

/**
 * Create a WebRTC offer to initiate connection
 */
export async function createOffer(): Promise<RTCSessionDescriptionInit> {
  const config: RTCConfiguration = {
    iceServers: [
      // Using Google's public STUN servers
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  peerConnection = new RTCPeerConnection(config);
  
  // Create data channel for data transfer
  dataChannel = peerConnection.createDataChannel('sync', {
    ordered: true
  });

  dataChannel.onmessage = (event) => {
    console.log('Received data:', event.data);
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  
  return offer;
}

/**
 * Handle incoming offer and create answer
 */
export async function handleOffer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
  const config: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };

  peerConnection = new RTCPeerConnection(config);

  peerConnection.ondatachannel = (event) => {
    dataChannel = event.channel;
    dataChannel.onmessage = (e) => {
      console.log('Received data:', e.data);
    };
  };

  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  
  return answer;
}

/**
 * Handle incoming answer
 */
export async function handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
  if (!peerConnection) {
    throw new Error('No peer connection to answer');
  }
  await peerConnection.setRemoteDescription(answer);
}

/**
 * Add ICE candidate (for NAT traversal)
 */
export async function addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
  if (peerConnection) {
    await peerConnection.addIceCandidate(candidate);
  }
}

/**
 * Send data to peer
 */
export function sendToPeer(data: SyncData): void {
  if (dataChannel && dataChannel.readyState === 'open') {
    dataChannel.send(JSON.stringify(data));
  }
}

/**
 * Close peer connection
 */
export function closePeerConnection(): void {
  if (dataChannel) {
    dataChannel.close();
    dataChannel = null;
  }
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
}

/**
 * Copy text to clipboard (for connection codes)
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
}

/**
 * Simple QR code generator for connection (using canvas)
 * This is a simplified version - in production use a library
 */
export function generateQRCode(data: string): string {
  // For now, return a simple text representation
  // In production, use a proper QR code library
  return `DEUTSCHFLASH:${data}`;
}

/**
 * Parse connection code
 */
export function parseConnectionCode(code: string): { type: 'offer' | 'answer'; data: string } | null {
  if (code.startsWith('DEUTSCHFLASH:')) {
    const parts = code.substring(14).split(':');
    if (parts.length === 2) {
      return {
        type: parts[0] as 'offer' | 'answer',
        data: parts[1]
      };
    }
  }
  return null;
}

/**
 * Manual sync via export/import (fallback when WebRTC fails)
 * This is useful for devices that can't connect directly
 */
export function createManualSyncPackage(
  vocabulary: VocabularyWord[],
  stats: UserStats,
  sessions: LearningSession[],
  settings: Settings,
  customDecks: CustomDeck[]
): string {
  const syncData: SyncData = {
    vocabulary,
    stats,
    sessions,
    settings,
    customDecks,
    lastModified: Date.now()
  };
  return btoa(JSON.stringify(syncData));
}

/**
 * Parse manual sync package
 */
export function parseManualSyncPackage(data: string): SyncData | null {
  try {
    const decoded = atob(data);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Merge sync data (handles conflicts with last-write-wins)
 */
export function mergeSyncData(
  local: SyncData,
  remote: SyncData
): SyncData {
  // Last-write-wins strategy
  if (remote.lastModified > local.lastModified) {
    // Remote is newer - use remote data
    return remote;
  }
  // Local is newer or equal - keep local
  return local;
}

/**
 * Calculate sync differences
 */
export function calculateSyncDiff(
  local: SyncData,
  remote: SyncData
): { added: number; updated: number; conflicts: number } {
  let added = 0;
  let updated = 0;
  let conflicts = 0;

  const localWords = new Map(local.vocabulary.map(w => [w.id, w]));
  const remoteWords = new Map(remote.vocabulary.map(w => [w.id, w]));

  // Check for added and updated words
  for (const [id, remoteWord] of remoteWords) {
    const localWord = localWords.get(id);
    if (!localWord) {
      added++;
    } else if (remoteWord.lastReview !== localWord.lastReview) {
      if (remote.lastModified > local.lastModified) {
        updated++;
      } else {
        conflicts++;
      }
    }
  }

  return { added, updated, conflicts };
}
