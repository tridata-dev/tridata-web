export const initSqliteEngine = async () => {
	const SQL = await import("@stephen/sql.js");
	return new SQL.Database();
};
