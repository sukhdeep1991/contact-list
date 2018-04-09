export class Contact {
    _id: string;
    firstName: string;
    lastName: string;
    company: string;
    informations: Information[];
}

export class Information {
    type: string;
    value: string;
}