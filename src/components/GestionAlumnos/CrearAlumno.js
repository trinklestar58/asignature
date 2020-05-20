import React from 'react';

import {crearObjetoFromFormData, dateStringToTimestamp} from '../../utils/funciones.js';

class CrearAlumno extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	crearAlumno = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum, nombre, apellidos, dni, correoUpm, telefMovil, fechaNac, idUpm} = objFormData;
		fechaNac = dateStringToTimestamp(fechaNac);

		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('crear-alumno-form').reset();

		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

		instance.methods.crearAlumno.cacheSend(
			addrEthAlum,
			nombre,
			apellidos,
			dni,
			correoUpm,
			telefMovil,
			fechaNac,
			idUpm,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

		return (
			<>
				<h4>Crear alumno</h4>
				<form onSubmit={this.crearAlumno} id="crear-alumno-form">
					<div className="container p-0">
						<div className="form-group">
							<div className="row">
								<div className="col-12">
									<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>

									<div className="input-group">
			                            <div className="input-group-prepend">
			                                <span className="input-group-text">
			                                    <i className="fab fa-ethereum fa-lg" />
			                                </span>
			                            </div>
										<input type="text" className="form-control code" id="addrEthAlum" name="addrEthAlum" />
			                        </div>
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-12 col-md-4">
									<label htmlFor="nombre">Nombre del alumno</label>
									<input type="text" className="form-control" id="nombre" name="nombre" />
								</div>

								<div className="col-12 col-md-8">
									<label htmlFor="apellidos">Apellidos del alumno</label>
									<input type="text" className="form-control" id="apellidos" name="apellidos" />
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-12 col-md-3">
									<label htmlFor="dni">DNI del alumno</label>
									<input type="text" className="form-control" id="dni" name="dni" />
								</div>

								<div className="col-12 col-md-4">
									<label htmlFor="telefMovil">Teléfono móvil del alumno</label>
									
									<div className="input-group">
			                            <div className="input-group-prepend">
			                                <span className="input-group-text">
			                                    <i className="fas fa-phone fa-lg" />
			                                </span>
			                            </div>
										<input type="number" className="form-control" id="telefMovil" name="telefMovil" />
			                        </div>
								</div>

								<div className="col-12 col-md-5">
									<label htmlFor="fechaNac">Fecha de nacimiento del alumno</label>
									
									<div className="input-group">
			                            <div className="input-group-prepend">
			                                <span className="input-group-text">
			                                    <i className="fas fa-birthday-cake fa-lg" />
			                                </span>
			                            </div>
										<input type="date" className="form-control" id="fechaNac" name="fechaNac" />
			                        </div>
								</div>

							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-12 col-md-8">
									<label htmlFor="correoUpm">Correo de la UPM del alumno</label>
									
									<div className="input-group">
			                            <div className="input-group-prepend">
			                                <span className="input-group-text">
			                                    <i className="fas fa-at fa-lg" />
			                                </span>
			                            </div>
										<input type="text" className="form-control" id="correoUpm" name="correoUpm" />
			                        </div>
								</div>

								<div className="col-12 col-md-4">
									<label htmlFor="idUpm">ID de la UPM del alumno</label>
									<input type="text" className="form-control" id="idUpm" name="idUpm" />
								</div>
							</div>
						</div>

						<button type="submit" className="btn btn-primary margin-bottom-2">Crear alumno</button>
					</div>
				</form>
			</>
		);
	}

}

export default CrearAlumno;