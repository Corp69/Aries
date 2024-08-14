export class MdlAlmacen
{
public id:     number = -1;
public nombre: String = "";
public rfc:    String = "";
public codigo: String = "";
public curp:   String = "";
public correo: String = "";
public imagen: String = "";

public id_estatus:  number = 1;
public id_tipo:     number = 1;
public id_rh_empleado:  number = parseInt(localStorage.getItem("id"));

public id_sat_usocfdi:       number = 1;
public id_sat_regimenfiscal: number = 1;

}