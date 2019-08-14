class Validacao {

    errors: Array<Object> = []

    public isRequired(value : string, message: string) : void {
        if (!value || value.length <= 0) { this.errors.push({ message: message }) }
    }

    public hasMinLen(value : string, min: number, message: string) : void {
        if (!value || value.length < min) { this.errors.push({ message: message }) }
    }

    public hasMaxLen(value: string, max: number, message: string) : void {
        if (!value || value.length > max) { this.errors.push({message: message}) }
    }

    public error() : Array<Object> {
        return this.errors;
    }

    public clear() : void {
        this.errors = [];
    }

    public isValid() : boolean {
        return this.errors.length == 0;
    }
}

export default new Validacao()
