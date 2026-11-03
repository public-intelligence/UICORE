import { PaginatedResult } from '../models/paginated-result';

export function toPaginatedResult<T>(apiResponse: any): PaginatedResult<T> {
    if (!apiResponse) {
        return {
            items: [],
            page: 1,
            pageSize: 0,
            totalItems: 0,
            totalPages: 0
        };
    }

    return {
        items: apiResponse.items || [],
        page: apiResponse.page || 1,
        pageSize: apiResponse.pageSize || 0,
        totalItems: apiResponse.totalItems || 0,
        totalPages: apiResponse.totalPages || 0
    };
}
