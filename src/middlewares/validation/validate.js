import Response from '../../utils/response.js';

const validateInput = validaionSchema => {
  return (req, res, next) => {
    let inputs = { ...req.body, ...req.params, ...req.query };
    // console.log('🚀 ~ file: validate.js:6 ~ return ~ inputs:', inputs);

    let { error } = validaionSchema.validate(inputs, { abrotEarly: false });

    if (error) {
      let errors = error.details.map(detail => detail.message);
      return Response(res, 'Not Valied Inputs', 406, errors);
    }

    next();
  };
};

export default validateInput;
