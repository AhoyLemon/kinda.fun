// Data sources:
// perStudent:      https://worldpopulationreview.com/state-rankings/per-pupil-spending-by-state (2025)
// averageStudents: https://www.publicschoolreview.com/average-school-size-stats/national-data (2026)

export interface SchoolData {
  state: string;
  stateCode: string;
  perStudent: number;
  averageStudents: number;
}

export const schoolData: SchoolData[] = [
  { state: "District of Columbia", stateCode: "DC", perStudent: 31629, averageStudents: 381 },
  { state: "Alabama", stateCode: "AL", perStudent: 13598, averageStudents: 545 },
  { state: "Alaska", stateCode: "AK", perStudent: 20340, averageStudents: 266 },
  { state: "Arizona", stateCode: "AZ", perStudent: 12003, averageStudents: 503 },
  { state: "Arkansas", stateCode: "AR", perStudent: 13873, averageStudents: 452 },
  { state: "California", stateCode: "CA", perStudent: 20233, averageStudents: 583 },
  { state: "Colorado", stateCode: "CO", perStudent: 15897, averageStudents: 455 },
  { state: "Connecticut", stateCode: "CT", perStudent: 25801, averageStudents: 497 },
  { state: "Delaware", stateCode: "DE", perStudent: 22201, averageStudents: 628 },
  { state: "Florida", stateCode: "FL", perStudent: 12689, averageStudents: 710 },
  { state: "Georgia", stateCode: "GA", perStudent: 15833, averageStudents: 752 },
  { state: "Hawaii", stateCode: "HI", perStudent: 23878, averageStudents: 574 },
  { state: "Idaho", stateCode: "ID", perStudent: 11056, averageStudents: 404 },
  { state: "Illinois", stateCode: "IL", perStudent: 20253, averageStudents: 481 },
  { state: "Indiana", stateCode: "IN", perStudent: 13622, averageStudents: 556 },
  { state: "Iowa", stateCode: "IA", perStudent: 14369, averageStudents: 381 },
  { state: "Kansas", stateCode: "KS", perStudent: 14847, averageStudents: 355 },
  { state: "Kentucky", stateCode: "KY", perStudent: 14596, averageStudents: 472 },
  { state: "Louisiana", stateCode: "LA", perStudent: 14645, averageStudents: 538 },
  { state: "Maine", stateCode: "ME", perStudent: 19962, averageStudents: 296 },
  { state: "Maryland", stateCode: "MD", perStudent: 20208, averageStudents: 643 },
  { state: "Massachusetts", stateCode: "MA", perStudent: 22947, averageStudents: 501 },
  { state: "Michigan", stateCode: "MI", perStudent: 18314, averageStudents: 406 },
  { state: "Minnesota", stateCode: "MN", perStudent: 17098, averageStudents: 363 },
  { state: "Mississippi", stateCode: "MS", perStudent: 12093, averageStudents: 500 },
  { state: "Missouri", stateCode: "MO", perStudent: 14241, averageStudents: 383 },
  { state: "Montana", stateCode: "MT", perStudent: 13656, averageStudents: 183 },
  { state: "Nebraska", stateCode: "NE", perStudent: 16147, averageStudents: 325 },
  { state: "Nevada", stateCode: "NV", perStudent: 11673, averageStudents: 652 },
  { state: "New Hampshire", stateCode: "NH", perStudent: 22978, averageStudents: 329 },
  { state: "New Jersey", stateCode: "NJ", perStudent: 26280, averageStudents: 541 },
  { state: "New Mexico", stateCode: "NM", perStudent: 17844, averageStudents: 351 },
  { state: "New York", stateCode: "NY", perStudent: 30012, averageStudents: 522 },
  { state: "North Carolina", stateCode: "NC", perStudent: 12995, averageStudents: 570 },
  { state: "North Dakota", stateCode: "ND", perStudent: 17102, averageStudents: 240 },
  { state: "Ohio", stateCode: "OH", perStudent: 17257, averageStudents: 472 },
  { state: "Oklahoma", stateCode: "OK", perStudent: 12162, averageStudents: 403 },
  { state: "Oregon", stateCode: "OR", perStudent: 17161, averageStudents: 420 },
  { state: "Pennsylvania", stateCode: "PA", perStudent: 21091, averageStudents: 572 },
  { state: "Rhode Island", stateCode: "RI", perStudent: 22110, averageStudents: 440 },
  { state: "South Carolina", stateCode: "SC", perStudent: 15060, averageStudents: 651 },
  { state: "South Dakota", stateCode: "SD", perStudent: 12828, averageStudents: 208 },
  { state: "Tennessee", stateCode: "TN", perStudent: 12197, averageStudents: 540 },
  { state: "Texas", stateCode: "TX", perStudent: 12444, averageStudents: 610 },
  { state: "Utah", stateCode: "UT", perStudent: 11342, averageStudents: 645 },
  { state: "Vermont", stateCode: "VT", perStudent: 28818, averageStudents: 272 },
  { state: "Virginia", stateCode: "VA", perStudent: 17104, averageStudents: 675 },
  { state: "Washington", stateCode: "WA", perStudent: 18564, averageStudents: 447 },
  { state: "West Virginia", stateCode: "WV", perStudent: 14575, averageStudents: 374 },
  { state: "Wisconsin", stateCode: "WI", perStudent: 15790, averageStudents: 372 },
  { state: "Wyoming", stateCode: "WY", perStudent: 20521, averageStudents: 270 },
];
