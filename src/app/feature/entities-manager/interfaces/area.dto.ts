export interface AreaDto {
    area_id: string;
    areaname: string;
    pattern_area_id?: string;
    branch_id: string;
    phone: string;
    description: string;
    active: boolean;
    id_entity: number;
}

export interface UpdateAreaDto {
    area_id: string;
    areaname?: string;
    pattern_area_id?: string;
    branch_id?: string;
    phone?: string;
    description?: string;
    active?: boolean;
    id_entity?: number;
}