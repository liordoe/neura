export class RepositoryError extends Error {
    public status: number;

    constructor(error: Error);
    constructor(error: string | Error, status:number = 500) {
        if (typeof error === 'string') {
            super(error);
            this.status = status;
        } else if (error instanceof Error) {
            super(error.message);
            this.status = 500;
        }
    }
}

export class RequestError extends Error {
    public status: number;
    public response: any;

    constructor(message: string, status: number = 500, response?:any) {
        super(message);
        this.status = status;
        this.response = response;
    }
}
