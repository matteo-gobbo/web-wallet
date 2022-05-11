import { Field, Form, Formik } from "formik";
import { validatePassword, validateUsername } from "entities/login/utils";

interface Props {
  initialValues: {
    username: string;
    password: string;
  };
  onSubmit: Function;
}

const LoginForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
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
          <Form className="mt-8 space-y-8 shadow-lg p-16">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="username">Username</label>
                <Field
                  id="username"
                  name="username"
                  validate={validateUsername}
                  className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {errors.username && touched.username && (
                  <div className="text-red-500">{errors.username}</div>
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  validate={validatePassword}
                  className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
