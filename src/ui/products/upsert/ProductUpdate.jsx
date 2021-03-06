import React from 'react';
import ProductForm from '../ProductForm';
import ProductUpsertStore from './ProductUpsertStore';
import PoSActions from '../../PoSActions';
import GoBackTitle from "../../components/GoBackTitle";

class ProductUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.productId = this.props.match.params.productId;
    this.state = ProductUpsertStore.getState();
  }

  componentDidMount() {
    document.title = 'Modificar producto';
    PoSActions.products.upsert.onIdChange(this.productId);
  }

  componentDidUpdate() {
    if (this.state.redirectToList) {
      PoSActions.products.upsert.setRedirectAsCompleted();
      this.props.history.push('/products');
    }
  }

  componentWillMount() {
    ProductUpsertStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ProductUpsertStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(ProductUpsertStore.getState());
  }

  static onBrandChange(e, { suggestion }) {
    PoSActions.products.upsert.onBrandChange(suggestion);
  }

  static onBrandAutosuggestValueChange(e) {
    PoSActions.products.upsert.onBrandInpValueChange(e.target.value);
  }

  static onMeasurementUnitChange(e, { suggestion }) {
    PoSActions.products.upsert.onMeasurementUnitChange(suggestion);
  }

  static onMeasurementUnitAutosuggestValueChange(e) {
    PoSActions.products.upsert.onMeasurementUnitInpValueChange(e.target.value);
  }

  static onNameChange(e) {
    PoSActions.products.upsert.onNameChange(e.target.value);
  }

  static onCodeChange(e) {
    PoSActions.products.upsert.onCodeChange(e.target.value);
  }

  static onDescriptionChange(e) {
    PoSActions.products.upsert.onDescriptionChange(e.target.value);
  }

  static onMinExistencesChange(e) {
    PoSActions.products.upsert.onMinExistencesChange(e.target.value);
  }

  static onSaveClicked(e) {
    e.preventDefault();
    PoSActions.products.upsert.save();
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <GoBackTitle title="Modificar"/>
          <br />
          <br />

          <ProductForm
            brandErr={ this.state.product.brand.errMessage }
            onBrandChange={ ProductUpdate.onBrandChange }
            onBrandAutosuggestValueChange={ ProductUpdate.onBrandAutosuggestValueChange }
            brandAutosuggestValue={ this.state.product.brand.inpValue }
            
            measurementUnitErr={ this.state.product.measurementUnit.errMessage }
            onMeasurementUnitChange={ ProductUpdate.onMeasurementUnitChange }
            onMeasurementUnitAutosuggestValueChange={ ProductUpdate.onMeasurementUnitAutosuggestValueChange }
            measurementUnitAutosuggestValue={ this.state.product.measurementUnit.inpValue }

            name={ this.state.product.name.value }
            nameErr={ this.state.product.name.errMessage }
            onNameChange={ ProductUpdate.onNameChange }

            code={ this.state.product.code.value }
            codeErr={ this.state.product.code.errMessage }
            onCodeChange={ ProductUpdate.onCodeChange }

            description={ this.state.product.description.value }
            descriptionErr={ this.state.product.description.errMessage }
            onDescriptionChange={ ProductUpdate.onDescriptionChange }

            minExistences={ this.state.product.minExistences.value }
            minExistencesErr={ this.state.product.minExistences.errMessage }
            onMinExistencesChange={ ProductUpdate.onMinExistencesChange }

            onSaveClicked={ ProductUpdate.onSaveClicked }
            submitText="Modificar"
          />
        </div>
      </div>
    )
  }
}

export default ProductUpdate;
