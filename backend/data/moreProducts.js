const mk = (image, name, brand, category, price, stock, rating, reviews, desc) => ({
  name, image, description: desc, brand, category,
  price, countInStock: stock, rating, numReviews: reviews,
});

const moreProducts = [
  mk("/images/shoe1.jpg", "Urban street sneakers", "Nike", "Shoes", 109.99, 10, 5, 40, "Classic everyday sneaker."),
  mk("/images/shoe2.jpg", "Pro running shoes", "Adidas", "Shoes", 94.99, 12, 4.5, 28, "Lightweight running shoe."),
  mk("/images/shoe3.jpg", "Casual leather shoes", "Puma", "Shoes", 74.99, 9, 4.0, 11, "Comfortable casual shoe."),
  mk("/images/slipper1.jpg", "Comfort home slippers", "Generic", "Shoes", 19.99, 25, 4.0, 8, "Soft indoor slippers."),
  mk("/images/slipper2.jpg", "Cozy knit slippers", "Generic", "Shoes", 17.99, 30, 4.0, 6, "Warm knit slippers."),
  mk("/images/tshirt1.jpg", "Classic cotton t-shirt", "Champion", "T-Shirts", 24.99, 20, 4.5, 15, "Soft everyday tee."),
];

export default moreProducts;
