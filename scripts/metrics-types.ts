export interface FunctionMetricEntry {
  file: string;
  name: string;
  line: number;
  physical: number;
  logic: number;
  cc: number;
  cognitive: number;
}

export interface MetricsAuditResult {
  filesCount: number;
  evaluatedFunctions: number;
  maxFileLines: number;
  maxFileLinesPath: string;
  maxLineLength: number;
  maxLineLengthPath: string;
  maxPhysical: number;
  maxLogic: number;
  maxCC: number;
  maxCog: number;
  maxNesting: number;
  errors: string[];
  ledger: FunctionMetricEntry[];
}
