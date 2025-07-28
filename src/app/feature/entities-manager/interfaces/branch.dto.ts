export interface BranchDto {
    id_branch: string;
    id_entity: number;
    name_branch: string;
    city: string;
    phone: string;
    state: boolean;
}

export interface UpdateBranchDto {
    id_branch: string,
    id_entity: number,
    name_branch?: string,
    city?: string,
    phone?: string,
    state?: boolean
}