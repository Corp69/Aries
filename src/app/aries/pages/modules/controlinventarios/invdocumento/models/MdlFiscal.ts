export class MdlFiscal
{
public id:     number = -1;
public ver:     String = "";
public serie: String = "";
public folio:    String = "";
public fecha_creacion: String = "";
public fecha:   String = "";
public tipo_cambio: String = "";

public id_rh_empleado:  number = parseInt(localStorage.getItem("id"));
public id_cliente:     number = 1;
public id_proveedor:  number = 1;
public id_moneda:  number = 1;
public id_sat_exportacion:  number = 1;
public id_metodopago:  number = 1;
public id_sat_cobro:  number = 1;
public id_sat_comprobante:  number = 1;
public id_sucursal_domicilio:       number = 1;
public id_sat_nomina_tipo: number = 1;
public id_estatus: number = 1;

}