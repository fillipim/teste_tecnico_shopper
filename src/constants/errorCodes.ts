const errorCodes = {
  INVALID_DATA: {
    error_code: "INVALID_DATA",
    error_description:
      "Os dados fornecidos no corpo da requisição são inválidos.",
  },
  DOUBLE_REPORT: {
    error_code: "DOUBLE_REPORT",
    error_description: "Já existe uma leitura para este tipo no mês atual.",
  },
  MEASURE_NOT_FOUND: {
    error_code: "MEASURE_NOT_FOUND",
    error_description: "Leitura não encontrada.",
  },
  CONFIRMATION_DUPLICATE: {
    error_code: "CONFIRMATION_DUPLICATE",
    error_description: "Leitura já confirmada.",
  },
  INVALID_TYPE: {
    error_code: "INVALID_TYPE",
    error_description: "Tipo de medição não permitida.",
  },
  MEASURES_NOT_FOUND: {
    error_code: "MEASURES_NOT_FOUND",
    error_description: "Nenhuma leitura encontrada.",
  },
};

export default errorCodes;
