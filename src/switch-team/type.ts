export interface IBuyNumberRequest {
  userId: string;
  skyId: string;
  mappedNumbers: string;
  network_type: "MTN" | "GLO" | "AIRTEL" | "ETISALAT";
  request_type: "pending" | "completed" | "rejected";
  account_type: "";
}
