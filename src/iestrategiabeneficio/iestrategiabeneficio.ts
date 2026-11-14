/**
 * Contrato para establecer el precio final de un combo.
 */
export interface IEstrategiaBeneficio {
 /**
  * Calcula el precio final del combo a partir de su precio base.
  *
  * @param precioBase Suma de los precios individuales.
  * @returns Precio final del combo.
  */
 calcular(precioBase: number): number
}