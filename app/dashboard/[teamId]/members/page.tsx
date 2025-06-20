'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

import React from 'react';

import { useState, useEffect } from 'react'

import {useParams} from 'next/navigation';

import * as stack from '@stackframe/stack';

import { TeamUser } from '@stackframe/stack';

export default function TeamMembersPage() {
    const {teamId} = useParams<{ teamId: string }>();
    const user = stack.useUser({or:'throw'});
    const [members, setMembers] = useState<TeamUser[]>([]);

    useEffect(() => {

        const fetchMembers = async () => {
            const currentTeam = await user.getTeam(teamId);
            if (!currentTeam) return;

            const teamMembers = await currentTeam.listUsers();
            setMembers(teamMembers);
        };

        fetchMembers();

    }, [teamId, user]);

    if (members.length < 1) {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2} className="h-24 text-center">
                            No team members found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {members.map((member) => (
                    <TableRow key={member.id}>
                        <TableCell className="flex items-center">
                            <Avatar className="h-9 w-9">
                                {member.teamProfile.profileImageUrl && (
                                    <AvatarImage src={member.teamProfile.profileImageUrl} alt="Avatar"/>
                                )}
                                <AvatarFallback>
                                    {member.teamProfile.displayName ? member.teamProfile.displayName.substring(0, 2).toUpperCase() : 'US'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {member.teamProfile.displayName || 'Unnamed User'}
                                </p>
                            </div>
                        </TableCell>
                        <TableCell>Member</TableCell> {/* Assuming a default role for now */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
