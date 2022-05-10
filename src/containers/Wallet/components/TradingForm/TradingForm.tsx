import { Field, Form, Formik } from "formik";

interface Props {
  initialValues: {
    price?: number;
    amount: number;
  };
  onSubmit: Function;
}

const TradingForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form>
            <div>
              <label htmlFor="price">Price</label>
              <Field id="price" name="price" />
              {errors.price && touched.price && <div>{errors.price}</div>}
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <Field id="amount" name="amount" />
              {errors.amount && touched.amount && <div>{errors.amount}</div>}
            </div>
            <button type="submit">Buy</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TradingForm;
