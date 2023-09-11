const validFruits = ["Apple", "Banana", "Pear", "Orange"]; 

export function validatePurchaseForInsert(purchase) {
  const errors = [];

  for (let [key, item] of Object.entries(purchase)) {
    if (!validFruits.includes(key)) {
      errors.push(`Invalid object in purchase ${key}`)
    }

    if (!item.value) {
      errors.push(`Price missing for ${key}`)
    }

    if (!Number.isInteger(Number(item.quantity))) {
      errors.push(`Quantity is not integer for ${key}`)
    }
  }

  return errors.length === 0;
}

export function consolidatePurchases(purchases) {
  let output = {};

  for (let purchase of purchases) {
    output[purchase.item] = output[purchase.item] || {};

    output[purchase.item].quantity = (output[purchase.item].quantity || 0) + Number(purchase.quantity)
    output[purchase.item].value = (output[purchase.item].value || 0) + Number(purchase.value)
  }

  return output;
}