export interface Category {
    ok:        boolean;
    categoria: string;
    result:    Products[];
}

export interface Products {
    id:          number;
    category_id: string;
    discount:    number;
    inventory:   number;
    sku:         string;
    name:        string;
    price:       number;
    weight:      number;
    shortDesc:   string;
    longDesc:    string;
    image:       null;
    createdAt:   Date;
    updateAt:    Date;
}
