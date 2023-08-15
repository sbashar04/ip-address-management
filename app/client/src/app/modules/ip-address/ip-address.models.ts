export interface IIPRequest {
    ip_address: string;
    label: string;
}

export interface IIPResponse {
    success: boolean;
    data: IIPSuccess;
    errors: IIPError;
}

export interface IIPSuccess {
    ip_address: {
        ip_address: string;
        label: string;
        user_id: number;
        updated_at: string;
        created_at: string;
        id: number;
    }
}

export interface IIPError {
    message?: string;
    messages?: {
        ip_address: string[];
        label: string[];
    }
}


export interface IIpAddressList {
    success: boolean;
    data: {
        ip_addresses: {
            current_page: number;
            data: ISingleIp[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: ILink[]
            next_page_url: string;
            path: string;
            per_page: string;
            prev_page_url: string;
            to: number;
            total: number;
        }
    }
}

export interface ISingleIp {
    id: number;
    ip_address: string;
    label: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface ILink {
    url: string;
    label: string;
    active: boolean;
}
