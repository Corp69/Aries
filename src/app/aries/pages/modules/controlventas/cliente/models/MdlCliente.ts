export class MdlCliente
{	
	public id: number = -1; 
	public nombre: String = ''; 
	public primerapellido: String = '';
	public segundoapellido: String = '';
	public rfc: String = '';
	public curp: String = '';
	public codigo: String = '';
	public correo: String = '';
	public nss:  Date = new Date();
	public banco:  Date = new Date();	
	public cuenta: number = 0;
	public clabe: number = 0;
	public id_cliente_domicilio: number = 0;
	public id_tipo_documento: String = '';
	public id_moneda: String = '';
	public id_rh_empleado: String = '';
	public id_sat_usocfdi: String = '';

	public id_sat_regimenfiscal: number = -1;
	public imagen: number = -1;
	public fecharegistro: number = -1;
	public id_estatus: number = -1;
	public id_tipo: number = -1;
}

