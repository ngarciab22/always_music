create table estudiantes (
	nombre varchar (20) not null,
	rut varchar (20) unique,
	curso varchar (20),
	nivel int
)