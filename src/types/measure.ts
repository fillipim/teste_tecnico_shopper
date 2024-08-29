interface UploadRequestBody {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
}

interface editMeasureRequestBody {
  measure_uuid: string;
  confirmed_value: number;
}

export { UploadRequestBody, editMeasureRequestBody };
