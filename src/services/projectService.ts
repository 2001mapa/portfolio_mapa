"use server";

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { dbGetAllProjects, dbUpdateProjectStatus, dbUpdateProject, dbCreateProject, dbRemoveProject, type Project } from './projectData';

export type { Project };

async function verifyAdminAuth() {
  const secretToken = process.env.JWT_SECRET;
  if (!secretToken) throw new Error("JWT_SECRET is not set");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (!sessionCookie) throw new Error("Unauthorized");
  try {
    await jwtVerify(sessionCookie.value, new TextEncoder().encode(secretToken));
  } catch (e) {
    throw new Error("Invalid session token");
  }
}

export async function getAllProjects(): Promise<Project[]> {
  await verifyAdminAuth();
  return dbGetAllProjects();
}

export async function updateProjectStatus(id: string, newStatus: string): Promise<void> {
  await verifyAdminAuth();
  return dbUpdateProjectStatus(id, newStatus);
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  await verifyAdminAuth();
  return dbUpdateProject(id, updates);
}

export async function createProject(projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
  await verifyAdminAuth();
  return dbCreateProject(projectData);
}

export async function removeProject(id: string): Promise<void> {
  await verifyAdminAuth();
  return dbRemoveProject(id);
}
