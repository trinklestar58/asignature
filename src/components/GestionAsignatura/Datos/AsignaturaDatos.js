import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {jsonInterface} from '../../../utils/varios.js';
import {crearObjetoFromFormData} from '../../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaDatos extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		
	}

	actualizarCoordinador = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthCoord} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('actualizar-coordinador-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		// TODO: comprobar que está el coordinador (profesor) creado

		const txId = instance.methods.actualizarCoordinador.cacheSend(
			addrEthCoord,
			{from: this.props.miDireccion}
		);
	}

	actualizarOwner = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthOwner} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('actualizar-owner-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		const txId = instance.methods.actualizarOwner.cacheSend(
			addrEthOwner,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState, contractName} = this.props;

		console.log('AsignaturaDatos-', this.props.miDireccion);

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let actualizarCoordinador = [];
		if (this.props.isOwner || this.props.isCoordinador) {
			actualizarCoordinador = <section>
				<h3>Actualizar coordinador</h3>
				<form onSubmit={this.actualizarCoordinador} id="actualizar-coordinador-form">
					<label htmlFor="addrEthCoord">Dirección Ethereum del coordinador</label>
					<input type="text" id="addrEthCoord" name="addrEthCoord" />

					<button type="submit">Actualizar coordinador</button>
				</form>
			</section>;
		}

		let actualizarOwner = [];
		if (this.props.isOwner) {
			actualizarOwner = <section>
				<h3>Actualizar owner</h3>
				<form onSubmit={this.actualizarOwner} id="actualizar-owner-form">
					<label htmlFor="addrEthOwner">Dirección Ethereum del owner</label>
					<input type="text" id="addrEthOwner" name="addrEthOwner" />

					<button type="submit">Actualizar owner</button>
				</form>
			</section>;
		}

		return (
			<>
				<h3>Datos de la asignatura</h3>
				<p>Nombre del contrato: {contractName}</p>

				<table>
					<tbody>
						<tr>
							<td>Owner</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"owner"}
												render={(owner) => (
													<>{owner} {owner === this.props.miDireccion ? "(yo)" : ""}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Coordinador</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"coordinador"}
												render={(coordinador) => (
													<>{coordinador} {coordinador === this.props.miDireccion ? "(yo)" : ""}</>
												)} />
							</td>
						</tr>						

						<tr>
							<td>Nombre asignatura</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"nombreAsignatura"} />
							</td>
						</tr>

						<tr>
							<td>Curso académico</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"cursoAcademico"} />
							</td>
						</tr>

						<tr>
							<td>Código asignatura</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"codigoAsignatura"} />
							</td>
						</tr>

						<tr>
							<td>Titulación</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"titulacion"} />
							</td>
						</tr>

						<tr>
							<td>Número de créditos</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numCreditos"} />
							</td>
						</tr>

						<tr>
							<td>Semestre</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"semestre"} />
							</td>
						</tr>

						<tr>
							<td>Curso (1º, 2º, etc.)</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"cursoAno"} />
							</td>
						</tr>

						<tr>
							<td>Tipo de asignatura</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"tipoAsignatura"}
												render={tipoAsignatura => (
													<>
														{tipoAsignatura === "0" ? "Obligatoria" : ""}
														{tipoAsignatura === "1" ? "Optativa" : ""}
													</>
												)} />
							</td>
						</tr>

						<tr>
							<td>numAlumnos</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numAlumnos"} />
							</td>
						</tr>

						<tr>
							<td>numProfesores</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numProfesores"} />
							</td>
						</tr>

						<tr>
							<td>numEvaluaciones</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numEvaluaciones"} />
							</td>
						</tr>
					</tbody>
				</table>

				{actualizarCoordinador}

				{actualizarOwner}
				
			</>
		);
	}
}

export default AsignaturaDatos;