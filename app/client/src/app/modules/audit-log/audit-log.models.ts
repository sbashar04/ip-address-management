import { ILink } from "../ip-address/ip-address.models";

export interface IAuditLog {
    success: boolean;
    data: {
        logs: {
            current_page: number,
            data: ILog[],
            first_page_url: string,
            from: number,
            last_page: number,
            last_page_ur: string,
            links: ILink[],
            next_page_url: string,
            path: string,
            per_page: number,
            prev_page_url: string,
            to: number,
            total: number
        }
    }
}

export interface ILog {
    id: number,
    subject: string,
    log_type: number,
    data_type: number,
    old_data: string,
    new_data: string,
    user_id: number,
    user: {
        id: number,
        name: string,
        email: string,
        email_verified_at: string,
        created_at: string,
        updated_at: string
    }
    created_at: string,
    updated_at: string,
}
