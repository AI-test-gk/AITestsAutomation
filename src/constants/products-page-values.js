const PRODUCTS_PAGE_VALUES = {
    title: 'Products',
    defaultSortOptionLabel: 'Name (A to Z)',
    productsCount: 6,
    cartBadgeAfterAdd: '1',
    cartItemsCountAfterAdd: 1,
    cartItemsCountAfterRemove: 0,
    sortOptions: {
        nameAsc: {
            value: 'az',
            label: 'Name (A to Z)'
        },
        nameDesc: {
            value: 'za',
            label: 'Name (Z to A)'
        },
        priceAsc: {
            value: 'lohi',
            label: 'Price (low to high)'
        },
        priceDesc: {
            value: 'hilo',
            label: 'Price (high to low)'
        }
    }
};

export default PRODUCTS_PAGE_VALUES;
