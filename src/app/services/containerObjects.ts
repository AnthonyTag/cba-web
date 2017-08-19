export class PriceObject {
    description: String;
    amount: String;
}

export class ItemObject {
    title: String;
    description: String;
    price: PriceObject[];
    extras: PriceObject[];
    tags: String[];
}

export class MenuObject {
    title: String;
    description: String;
    items: ItemObject[];
}