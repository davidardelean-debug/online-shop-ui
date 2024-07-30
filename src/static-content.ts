import Product from "./entities/Product";

export const PRODUCTS: Product[] = [
  {
    id: "041aa5c8-203c-425d-b86e-c46ec469c0c2",
    name: "Running Shoes",
    description: "Lightweight and breathable for your next run",
    price: 79.99,
    weight: 0.75,
    supplier: "Nike",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/477abbf8-b37a-4fe6-b516-08e294a8487a/AIR+ZOOM+ALPHAFLY+NEXT%25+3.png",
    category: {
      id: "c84e502a-e848-45ce-a8d1-b53866a465d2",
      name: "Sports",
      description: "Gear for all your athletic needs",
    },
  },
  {
    id: "b40e4cea-71e8-4af5-9494-d7ffa2d98076",
    name: "Backpack",
    description: "Spacious and comfortable for everyday use",
    price: 49.99,
    weight: 1.5,
    supplier: "The North Face",
    imageUrl:
      "https://images.thenorthface.com/is/image/TheNorthFaceEU/52ST_ZU3_hero?wid=800&hei=800&fmt=jpg&qlt=85,1&op_sharpen=0&resMode=sharp2&op_usm=1,1,1,0",
    category: {
      id: "a791012a-611c-4525-b752-fe302fc04d8d",
      name: "Travel",
      description: "Essentials for your next adventure",
    },
  },
  {
    id: "d7d138e2-c8e3-4a96-8dc3-b69fb78e903c",
    name: "Bucket Hat",
    description: "Reversible design for two stylish looks",
    price: 24.99,
    weight: 0.25,
    supplier: "Urban Outfitters",
    imageUrl:
      "https://capsapparel.com/cdn/shop/products/HAPPY-BUCKET-ORANGE.jpg?v=1698670002&width=600",
    category: {
      id: "a791012a-611c-4525-b752-fe302fc04d8d",
      name: "Accessories",
      description: "Complete your outfit with the perfect finishing touch",
    },
  },
  {
    id: "f6de3711-efde-4235-bd9e-0c20f66e4d16",
    name: "Wool Beanie",
    description: "Warm and cozy for winter weather",
    price: 29.99,
    weight: 0.3,
    supplier: "Patagonia",
    imageUrl:
      "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5b269f6c/images/hi-res/29206_FPAT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f5f5f5",
    category: {
      id: "a791012a-611c-4525-b752-fe302fc04d8d",
      name: "Winter Gear",
      description: "Stay warm and comfortable in the cold",
    },
  },
];
