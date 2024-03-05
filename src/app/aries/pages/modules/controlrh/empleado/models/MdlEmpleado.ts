export class MdlEmpleado
{	
	public id: number = -1; 
	public nombre: String = ''; 
	public paterno: String = '';
	public materno: String = '';
	public correo: String = '';
	public nss: String = '';
	public rfc: String = '';
	public curp: String = '';
	public fecha_nacimiento:  Date = new Date();
	public fecha_ingreso:  Date = new Date();	
	public cuenta_banco: number = 0;
	public clabe: number = 0;
	public whatsapp: number = 0;
	public codigo: String = '';
	public observaciones: String = '';
	public contacto1: String = '';
	public contacto2: String = '';

	public id_sexo: number = -1;
	public id_rh_estatus: number = -1;
	public id_rh_clasificacion: number = -1;
	public id_rh_grado: number = -1;
	public id_rh_puesto: number = -1;
}

