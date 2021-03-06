import React from 'react';
import PropTypes from 'prop-types';
import Paginator from '../../components/paginated_table/Paginator';
import { Link } from "react-router-dom";

const ProvidersTable = ({ providers, activePage, totalPages, navCallback, filterId, filterName, onFilterIdChange,
                          onFilterNameChange }) => {
  const makeTableBody = () => {
    if (providers.length === 0) {
      return (
        <tr>
          <td colSpan={3} className={'text-center'}>
            <i>No hay provedores para mostrar</i>
          </td>
        </tr>
      );
    }

    return providers.map(provider => (
      <tr key={provider.id}>
        <td>{provider.id}</td>
        <td>{provider.name}</td>
        <td className='text-right'>
          <Link
            to={`/providers/update/${ provider.id }`}
            title="Modificar proveedor"
            className="btn btn-sm btn-default"
          >
            <span className="glyphicon glyphicon-pencil" />
          </Link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </td>
      </tr>
    ));
  };

  return (
    <div className="row padding-top-8">
      <div className="col-xs-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <label className="control-label">#</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={ onFilterIdChange }
                  value={ filterId }
                />
              </th>
              <th>
                <label className="control-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={ onFilterNameChange }
                  value={ filterName }
                />
              </th>
              <th/>
            </tr>
          </thead>
          <tbody>{makeTableBody()}</tbody>
        </table>

        <Paginator
          activePage={activePage}
          totalPages={totalPages}
          navCallback={navCallback}
        />
      </div>
    </div>
  );
};

ProvidersTable.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  navCallback: PropTypes.func.isRequired,
  filterId: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
  onFilterIdChange: PropTypes.func.isRequired,
  onFilterNameChange: PropTypes.func.isRequired
};

export default ProvidersTable;
