import { PYTHONEngine, SQLEngine } from "@/types/store";
import { CellLanguage } from "@/lib/constants";
import { REngine } from "@/types/store";
export type SetEnginePayload =
	| { lang: CellLanguage.R; engine: REngine }
	| { lang: CellLanguage.PYTHON; engine: PYTHONEngine }
	| { lang: CellLanguage.SQL; engine: SQLEngine };
