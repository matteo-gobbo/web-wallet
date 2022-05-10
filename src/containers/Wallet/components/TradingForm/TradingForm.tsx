import { Field, Form, Formik } from "formik";

interface Props {
  initialValues: {
    price?: number;
    amount: number;
  };
  onSubmit: Function;
  textButton: string;
  additionalClassesButton: string;
}

const TradingForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  textButton,
  additionalClassesButton,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ errors, touched, values }) => {
        return (
          <Form className="space-y-8 border p-8 rounded w-full">
            <div>
              <label htmlFor="price">Price</label>
              <Field
                id="price"
                name="price"
                type="number"
                className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={initialValues.price}
              />
              {errors.price && touched.price && <div>{errors.price}</div>}
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <Field
                id="amount"
                name="amount"
                type="number"
                className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors.amount && touched.amount && <div>{errors.amount}</div>}
            </div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${additionalClassesButton}`}
              disabled={initialValues.amount === Number(values.amount)}
            >
              {textButton}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TradingForm;
