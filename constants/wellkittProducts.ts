export interface WellkittProduct {
  id: string;
  name: string;
  brand: 'Soria Natural' | 'Biofito' | 'Wellkitt';
  ingredients: string[];
  benefits: string[];
  presentation?: string;
  category: string;
}

export const wellkittProducts: WellkittProduct[] = [
  // Soria Natural
  { id: "SN01", name: "Calciflavón (Tablets)", brand: "Soria Natural", ingredients: ["Isoflavonas de soja", "calcio", "fósforo", "magnesio", "silicio", "vitamina D"], benefits: ["Alivia síntomas menopáusicos", "fortalece huesos", "efecto antioxidante"], category: "Salud Femenina", presentation: "Tablets" },
  { id: "SN02", name: "Coenzima Q10 (Cápsulas)", brand: "Soria Natural", ingredients: ["Coenzima Q10 (100 mg)", "vitamina E (12 mg)"], benefits: ["Energía celular (ATP)", "salud cardiovascular", "antioxidante", "mejora resistencia física"], category: "Energía y Rendimiento", presentation: "Cápsulas" },
  { id: "SN03", name: "Crisálida G (Emulsión)", brand: "Soria Natural", ingredients: ["Extracto de crisálida de gusano de seda (8%)", "centella asiática", "cola de caballo", "equinácea", "salvia", "vitamina C y E", "elastina"], benefits: ["Regeneración de piel", "mejora de cicatrices", "firmeza", "elasticidad cutánea"], category: "Piel y Belleza", presentation: "Emulsión tónico-renovadora" },
  { id: "SN04", name: "Diatonato 1", brand: "Soria Natural", ingredients: ["Gluconato de manganeso (0.6 mg)"], benefits: ["Refuerza sistema respiratorio", "regula funciones alérgicas", "mejora defensas"], category: "Sistema Inmune" },
  { id: "SN05", name: "Diatonato 2", brand: "Soria Natural", ingredients: ["Gluconato de manganeso y cobre"], benefits: ["Estimula sistema inmunológico y metabólico", "antioxidante"], category: "Sistema Inmune" },
  { id: "SN06", name: "Diatonato 3", brand: "Soria Natural", ingredients: ["Gluconato de manganeso y cobalto"], benefits: ["Apoyo en fatiga crónica", "ansiedad", "trastornos hormonales"], category: "Anti-Estrés y Sueño" },
  { id: "SN07", name: "Diatonato 5.1", brand: "Soria Natural", ingredients: ["Gluconato de zinc y cobre"], benefits: ["Equilibrio hormonal", "piel", "inmunidad", "energía"], category: "Salud Femenina" },
  { id: "SN08", name: "Diatonato 5.2", brand: "Soria Natural", ingredients: ["Gluconato de zinc", "níquel", "cobalto"], benefits: ["Regulación endocrina", "metabolismo energético"], category: "Metabolismo" },
  { id: "SN09", name: "Fosfoserina Complex", brand: "Soria Natural", ingredients: ["Fosfatidilserina", "fosfatidilcolina", "taurina", "vitaminas B6, B12, C, D, E, A", "zinc"], benefits: ["Mejora memoria", "concentración", "rendimiento mental", "protección neuronal"], category: "Salud Cerebral" },
  { id: "SN10", name: "Fostprint Classic", brand: "Soria Natural", ingredients: ["Jalea real", "propóleo", "vitaminas", "minerales"], benefits: ["Energía física y mental", "antioxidante", "inmunoestimulante"], category: "Energía y Rendimiento" },
  { id: "SN11", name: "Fostprint MAX", brand: "Soria Natural", ingredients: ["Jalea real", "propóleo", "extracto de té verde", "vitaminas y minerales"], benefits: ["Estimulación energética", "antioxidante", "concentración"], category: "Energía y Rendimiento" },
  { id: "SN12", name: "Inulac Tablets", brand: "Soria Natural", ingredients: ["Inulina", "enzimas digestivas", "probióticos"], benefits: ["Mejora digestión", "flora intestinal", "tránsito intestinal"], category: "Salud Digestiva", presentation: "Tablets" },
  { id: "SN13", name: "Lacticol suspensión", brand: "Soria Natural", ingredients: ["Jugo de col fermentado", "remolacha roja"], benefits: ["Probiótico natural", "digestión", "refuerzo inmunológico"], category: "Salud Digestiva", presentation: "Suspensión" },
  { id: "SN14", name: "Mincartil polvo", brand: "Soria Natural", ingredients: ["Aminoácidos vegetales", "minerales", "vitaminas"], benefits: ["Fortalece articulaciones", "piel", "cabello y uñas"], category: "Articulaciones y Movilidad", presentation: "Polvo" },
  { id: "SN15", name: "Minesor con Selenio", brand: "Soria Natural", ingredients: ["Oligoelementos y selenio"], benefits: ["Antioxidante", "tiroides", "inmunidad"], category: "Detox y Antioxidantes" },
  { id: "SN18", name: "Oligosor", brand: "Soria Natural", ingredients: ["Azufre", "cobalto", "cobre", "fósforo", "iodo", "litio", "magnesio", "potasio", "zinc"], benefits: ["Remineralización", "modulación neuroendocrina"], category: "Detox y Antioxidantes" },
  { id: "SN32", name: "Oligosor Azufre", brand: "Soria Natural", ingredients: ["Azufre"], benefits: ["Desintoxicación", "piel y cabello"], category: "Detox y Antioxidantes", presentation: "Ampollas" },
  { id: "SN33", name: "Oligosor Cobalto", brand: "Soria Natural", ingredients: ["Cobalto"], benefits: ["Metabolismo", "sistema nervioso"], category: "Metabolismo", presentation: "Ampollas" },
  { id: "SN34", name: "Oligosor Cobre", brand: "Soria Natural", ingredients: ["Cobre"], benefits: ["Sistema inmune", "antiinflamatorio"], category: "Sistema Inmune", presentation: "Ampollas" },
  { id: "SN35", name: "Oligosor Fósforo", brand: "Soria Natural", ingredients: ["Fósforo"], benefits: ["Energía mental", "memoria"], category: "Salud Cerebral", presentation: "Ampollas" },
  { id: "SN36", name: "Oligosor Iodo", brand: "Soria Natural", ingredients: ["Iodo"], benefits: ["Tiroides", "metabolismo"], category: "Metabolismo", presentation: "Ampollas" },
  { id: "SN37", name: "Oligosor Litio", brand: "Soria Natural", ingredients: ["Litio"], benefits: ["Equilibrio emocional", "estado de ánimo"], category: "Anti-Estrés y Sueño", presentation: "Ampollas" },
  { id: "SN38", name: "Oligosor Magnesio", brand: "Soria Natural", ingredients: ["Magnesio"], benefits: ["Relajación muscular", "sistema nervioso"], category: "Anti-Estrés y Sueño", presentation: "Ampollas" },
  { id: "SN39", name: "Oligosor Potasio", brand: "Soria Natural", ingredients: ["Potasio"], benefits: ["Función muscular", "equilibrio electrolítico"], category: "Energía y Rendimiento", presentation: "Ampollas" },
  { id: "SN40", name: "Oligosor Zinc", brand: "Soria Natural", ingredients: ["Zinc"], benefits: ["Sistema inmune", "piel y cabello"], category: "Sistema Inmune", presentation: "Ampollas" },
  { id: "SN19", name: "Resverasor", brand: "Soria Natural", ingredients: ["Resveratrol (extracto de uva negra)"], benefits: ["Antioxidante", "salud cardiovascular", "antiinflamatorio", "neuroprotector"], category: "Sistema Inmune" },
  { id: "SN20", name: "Analis L-Triptófano", brand: "Soria Natural", ingredients: ["L-Lisina", "L-Triptófano"], benefits: ["Precursor de serotonina y melatonina", "regula estado de ánimo"], category: "Anti-Estrés y Sueño", presentation: "60 cápsulas de 500 mg" },
  { id: "SN21", name: "Carnilis", brand: "Soria Natural", ingredients: ["L-Carnitina", "Nitrato de cromo"], benefits: ["Transporte de ácidos grasos", "mejora metabolismo energético", "reduce fatiga"], category: "Energía y Rendimiento", presentation: "60 cápsulas de 500 mg" },
  { id: "SN23", name: "Sorivid", brand: "Soria Natural", ingredients: ["Vitamina A", "Vitamina B12", "Vitamina C", "Vitamina D", "Vitamina E"], benefits: ["Inmunidad", "visión", "piel", "metabolismo celular"], category: "Vitaminas", presentation: "Cápsulas" },
  { id: "SN24", name: "Totalvid 4", brand: "Soria Natural", ingredients: ["Vitamina C", "Vitamina E", "Vitamina B6", "Vitamina A", "Vitamina B12", "PABA", "Colina", "Hierro", "Zinc", "Inositol", "Niacina", "Manganeso", "Fluoruro"], benefits: ["Complejo multivitamínico completo", "antioxidante", "energía", "inmunidad", "piel", "sistema nervioso"], category: "Vitaminas", presentation: "Cápsulas" },
  { id: "SN25", name: "Dilasor", brand: "Soria Natural", ingredients: ["Oligoelementos"], benefits: ["Mejora circulación", "vasodilatador"], category: "Circulación", presentation: "Ampollas" },
  { id: "SN26", name: "Vitamina A", brand: "Soria Natural", ingredients: ["Vitamina A"], benefits: ["Visión", "piel", "sistema inmune"], category: "Vitaminas", presentation: "Cápsulas" },
  { id: "SN27", name: "Vitamina B12", brand: "Soria Natural", ingredients: ["Vitamina B12"], benefits: ["Energía", "sistema nervioso", "metabolismo"], category: "Vitaminas", presentation: "Cápsulas" },
  { id: "SN28", name: "Vitamina C", brand: "Soria Natural", ingredients: ["Vitamina C"], benefits: ["Antioxidante", "sistema inmune", "colágeno"], category: "Vitaminas", presentation: "Cápsulas" },
  { id: "SN29", name: "Vitamina D3", brand: "Soria Natural", ingredients: ["Vitamina D3"], benefits: ["Salud ósea", "sistema inmune", "absorción calcio"], category: "Vitaminas", presentation: "Cápsulas" },
  { id: "SN30", name: "Vitamina D 5000 UI", brand: "Soria Natural", ingredients: ["Vitamina D3 5000 UI"], benefits: ["Salud ósea", "sistema inmune", "alta potencia"], category: "Vitaminas", presentation: "400 cápsulas" },
  { id: "SN31", name: "Vitamina E", brand: "Soria Natural", ingredients: ["Vitamina E"], benefits: ["Antioxidante", "salud cardiovascular", "protección celular"], category: "Vitaminas", presentation: "Cápsulas" },

  // Biofito
  { id: "BF01", name: "Hepacryl", brand: "Biofito", ingredients: ["Cardo mariano", "Alcachofa", "Boldo", "Diente de león", "Cúrcuma"], benefits: ["Protege hígado", "regenera células hepáticas", "desintoxica"], category: "Detox y Antioxidantes", presentation: "Bote 90 comprimidos 750 mg" },
  { id: "BF02", name: "Diente de León", brand: "Biofito", ingredients: ["Taraxacum officinale"], benefits: ["Desintoxica", "diurético", "estimula bilis"], category: "Detox y Antioxidantes", presentation: "Frasco gotero de 50 ml" },
  { id: "BF03", name: "Cola de Caballo", brand: "Biofito", ingredients: ["Equisetum arvense"], benefits: ["Diurético", "rico en silicio", "fortalece tejidos"], category: "Detox y Antioxidantes", presentation: "Frasco gotero de 50 ml" },
  { id: "BF04", name: "Colix", brand: "Biofito", ingredients: ["Menta", "Manzanilla", "Boldo", "Hinojo", "Galphimia glauca", "Fenogreco", "Orozuz", "Aloe", "Cúrcuma", "Jengibre"], benefits: ["Antiespasmódico", "mejora digestión", "calma dolor"], category: "Salud Digestiva", presentation: "Bote 90 comprimidos 750 mg" },
  { id: "BF05", name: "Jengibre", brand: "Biofito", ingredients: ["Zingiber officinale"], benefits: ["Mejora digestión", "antiinflamatorio", "estimula inmunidad"], category: "Salud Digestiva", presentation: "Frasco gotero de 50 ml" },
  { id: "BF06", name: "Melissa", brand: "Biofito", ingredients: ["Melissa officinalis"], benefits: ["Calma nervios", "mejora digestión", "antiviral"], category: "Salud Digestiva", presentation: "Frasco gotero de 50 ml" },
  { id: "BF07", name: "Ner-vit", brand: "Biofito", ingredients: ["Galphimia glauca", "Valeriana", "Azahar", "Melisa", "Pasiflora"], benefits: ["Calma nervios", "mejora sueño", "equilibra emociones"], category: "Anti-Estrés y Sueño", presentation: "Frasco gotero de 50 ml" },
  { id: "BF08", name: "Valeriana", brand: "Biofito", ingredients: ["Valeriana officinalis"], benefits: ["Sedante natural", "mejora sueño", "calma nervios"], category: "Anti-Estrés y Sueño", presentation: "Frasco gotero de 50 ml" },
  { id: "BF09", name: "Zapote Blanco", brand: "Biofito", ingredients: ["Casimiroa edulis"], benefits: ["Reduce presión arterial", "calma nervios", "mejora sueño"], category: "Anti-Estrés y Sueño", presentation: "Frasco gotero de 50 ml" },
  { id: "BF10", name: "Maca Peruana", brand: "Biofito", ingredients: ["Lepidium meyenii"], benefits: ["Aumenta energía y resistencia", "mejora función sexual", "equilibra hormonas"], category: "Energía y Rendimiento", presentation: "Frasco gotero de 50 ml" },
  { id: "BF11", name: "Alga Espirulina", brand: "Biofito", ingredients: ["Spirulina maxima"], benefits: ["Rica en proteínas, vitaminas y minerales", "aumenta energía"], category: "Energía y Rendimiento", presentation: "Bote 90 comprimidos 750 mg / Frasco gotero 50 ml" },
  { id: "BF12", name: "Fem-vit", brand: "Biofito", ingredients: ["Barbasco", "Salvia", "Melisa", "Valeriana", "Hipérico", "Galphimia glauca"], benefits: ["Alivia síntomas menopáusicos", "equilibra emociones", "regula hormonas"], category: "Salud Femenina", presentation: "Frasco gotero de 50 ml" },
  { id: "BF13", name: "Barbasco", brand: "Biofito", ingredients: ["Dioscorea composita (raíz)"], benefits: ["Precursor natural de hormonas", "alivia síntomas menopáusicos"], category: "Salud Femenina", presentation: "Frasco gotero 50 ml / Bote 90 comprimidos 500 mg" },
  { id: "BF14", name: "Milenrama", brand: "Biofito", ingredients: ["Achillea millefolium"], benefits: ["Regula el ciclo menstrual", "mejora digestión", "antiinflamatorio"], category: "Salud Femenina", presentation: "Frasco gotero de 50 ml" },
  { id: "BF15", name: "Uña de Gato", brand: "Biofito", ingredients: ["Uncaria tomentosa"], benefits: ["Antiinflamatorio", "inmunomodulador", "analgésico"], category: "Articulaciones y Movilidad", presentation: "Bote 90 comprimidos 500 mg" },
  { id: "BF16", name: "Harpagofito", brand: "Biofito", ingredients: ["Harpagophytum procumbens"], benefits: ["Antiinflamatorio", "analgésico", "mejora movilidad"], category: "Articulaciones y Movilidad", presentation: "Frasco gotero de 50 ml" },
  { id: "BF17", name: "Cúrcuma", brand: "Biofito", ingredients: ["Curcuma longa"], benefits: ["Potente antiinflamatorio", "antioxidante", "mejora digestión"], category: "Articulaciones y Movilidad", presentation: "Bote 90 comprimidos / Frasco gotero 50 ml" },
  { id: "BF18", name: "Bálsamo 3 Damianas", brand: "Biofito", ingredients: ["Damiana de California/Guerrero/San Luis", "Castaño de Indias", "Harpagofito", "Manzanilla", "Ortiga", "Romero", "Árnica"], benefits: ["Analgésico", "antiinflamatorio", "relajante muscular"], category: "Articulaciones y Movilidad", presentation: "Bote 120 ml" },
  { id: "BF19", name: "Immune Herb", brand: "Biofito", ingredients: ["Astrágalo", "Equinácea", "Cúrcuma", "Hongo shiitake", "Maca", "Uña de gato", "Mapurite"], benefits: ["Fortalece inmunidad", "adaptógeno", "antioxidante"], category: "Sistema Inmune", presentation: "Frasco gotero de 50 ml" },
  { id: "BF20", name: "Equinácea", brand: "Biofito", ingredients: ["Echinacea purpurea"], benefits: ["Estimula sistema inmune", "previene infecciones"], category: "Sistema Inmune", presentation: "Bote 90 comprimidos 750 mg / Frasco gotero 50 ml" },
  { id: "BF21", name: "Anti-B", brand: "Biofito", ingredients: ["Equinácea", "Caléndula", "Tomillo", "Cúrcuma", "Jengibre", "Uña de gato"], benefits: ["Antibiótico natural", "fortalece inmunidad", "antiinflamatorio"], category: "Sistema Inmune", presentation: "Bote 90 comprimidos 750 mg" },
  { id: "BF22", name: "Fat-less", brand: "Biofito", ingredients: ["Tamarindo malabar", "Alcachofa", "Té verde", "Cocolmeca", "Jamaica", "Tejocote", "Cardo mariano"], benefits: ["Acelera metabolismo", "quema grasa", "diurético"], category: "Control de Peso", presentation: "Bote 90 comprimidos 750 mg" },
  { id: "BF23", name: "Té Verde", brand: "Biofito", ingredients: ["Camellia sinensis"], benefits: ["Potente antioxidante", "acelera metabolismo", "mejora concentración"], category: "Control de Peso", presentation: "Frasco gotero de 50 ml" },
  { id: "BF24", name: "Ojo de Gallina", brand: "Biofito", ingredients: ["Galphimia glauca"], benefits: ["Antihistamínico", "calma nervios", "acelera metabolismo"], category: "Control de Peso", presentation: "Frasco 50 ml" },
  { id: "BF25", name: "Pro-vit", brand: "Biofito", ingredients: ["Zapote blanco (Casimiroa edulis)", "Olivo (Olea europaea)", "Espino blanco (Crataegus monogyna)", "Melisa (Melissa officinalis)", "Maíz estilos (Zea mays)", "Galphimia glauca"], benefits: ["Equilibra hormonas", "calma el sistema nervioso", "mejora el estado de ánimo"], category: "Regulación Hormonal", presentation: "Frasco gotero de 50 ml" },

  // Aminoácidos
  { id: "AA01", name: "Analis Aminoácido Glicina 130", brand: "Soria Natural", ingredients: ["Glicina"], benefits: ["Neurotransmisor inhibidor", "favorece sueño profundo", "síntesis de colágeno", "modula inflamación", "glucogénesis", "antioxidante", "protege sistema nervioso"], category: "Aminoácidos", presentation: "Polvo 130g" },
  { id: "AA02", name: "Analis Aminoácido Glicina 400", brand: "Soria Natural", ingredients: ["Glicina"], benefits: ["Neurotransmisor inhibidor", "favorece sueño profundo", "síntesis de colágeno", "modula inflamación", "glucogénesis", "antioxidante", "protege sistema nervioso"], category: "Aminoácidos", presentation: "Polvo 400g" },
  { id: "AA03", name: "Analis Aminoácido L-Arginina", brand: "Soria Natural", ingredients: ["L-Arginina", "L-Lisina"], benefits: ["Vasodilatador natural", "mejora circulación", "inmunomodulador", "precursor óxido nítrico", "estimula hormona del crecimiento"], category: "Aminoácidos", presentation: "60 cápsulas 500mg" },
  { id: "AA04", name: "Analis Aminoácido L-Prolina", brand: "Soria Natural", ingredients: ["L-Prolina", "L-Lisina"], benefits: ["Cofactor formación de colágeno", "elasticidad de tejidos", "reparación articulaciones", "piel y vasos sanguíneos"], category: "Aminoácidos", presentation: "60 cápsulas 500mg" },
  { id: "AA05", name: "Analis Neurotransmisores", brand: "Soria Natural", ingredients: ["L-Lisina", "L-Triptófano", "Glicina", "L-Arginina"], benefits: ["Apoyo neuromodulador", "equilibrio emocional", "ayuda insomnio", "ansiedad", "fatiga mental y estrés"], category: "Aminoácidos", presentation: "60 cápsulas 500mg" },
  { id: "AA06", name: "Cronovida", brand: "Soria Natural", ingredients: ["Ácido glutámico", "Glicina", "Arginina", "Fenilalanina", "L-Lisina", "L-Metionina", "Ácido fólico", "Colina"], benefits: ["Regulación neuroendocrina y ciclo sueño-vigilia", "modulación neurotransmisores", "regeneración hepática", "soporte metabólico y mental"], category: "Aminoácidos", presentation: "Polvo 260g" },
  { id: "AA07", name: "Deprelat", brand: "Soria Natural", ingredients: ["L-Arginina", "L-Triptófano"], benefits: ["Regulador estado de ánimo", "coadyuvante cuadros depresivos leves", "síndrome premenstrual y ansiedad"], category: "Aminoácidos", presentation: "60 cápsulas 500mg" },
  { id: "AA08", name: "Glicam 130", brand: "Soria Natural", ingredients: ["Glicina", "L-Lisina"], benefits: ["Estimula síntesis colágeno", "modula respuesta inmunitaria", "favorece sueño profundo", "repara tejidos conectivos"], category: "Aminoácidos", presentation: "Polvo 130g" },
  { id: "AA09", name: "Glicam 400", brand: "Soria Natural", ingredients: ["Glicina", "L-Lisina"], benefits: ["Estimula síntesis colágeno", "modula respuesta inmunitaria", "favorece sueño profundo", "repara tejidos conectivos"], category: "Aminoácidos", presentation: "Polvo 400g" },
  { id: "AA10", name: "Lisam 200", brand: "Soria Natural", ingredients: ["L-Lisina"], benefits: ["Favorece síntesis proteínas", "absorción calcio", "crecimiento óseo", "regeneración tisular", "antiviral contra herpes simplex"], category: "Aminoácidos", presentation: "200 cápsulas 500mg" },
  { id: "AA11", name: "Lisam 60", brand: "Soria Natural", ingredients: ["L-Lisina"], benefits: ["Favorece síntesis proteínas", "absorción calcio", "crecimiento óseo", "regeneración tisular", "antiviral contra herpes simplex"], category: "Aminoácidos", presentation: "60 cápsulas 500mg" },
  { id: "AA12", name: "Melis", brand: "Soria Natural", ingredients: ["L-Lisina", "L-Metionina"], benefits: ["Acción antiviral", "desintoxicante hepático", "mejora metabolismo lipídico", "regeneración tejidos"], category: "Aminoácidos", presentation: "60 cápsulas 500mg" },
  { id: "AA13", name: "Lisam 90", brand: "Soria Natural", ingredients: ["L-Lisina"], benefits: ["Favorece síntesis proteínas", "absorción calcio", "crecimiento óseo", "regeneración tisular", "antiviral contra herpes simplex"], category: "Aminoácidos", presentation: "90 cápsulas 500mg" },

  // Biofito - Productos Adicionales
  { id: "BF026", name: "ACI-VIT CAPS", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF027", name: "Acidux", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF028", name: "Ajo gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF029", name: "Alcachofa Ext", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Detox y Antioxidantes", presentation: "Gotas/Extracto" },
  { id: "BF030", name: "Alfalfa cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Cápsulas" },
  { id: "BF033", name: "Anxifem", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Anti-Estrés y Sueño" },
  { id: "BF034", name: "Artrox", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Articulaciones y Movilidad" },
  { id: "BF037", name: "Boldo extracto", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Detox y Antioxidantes" },
  { id: "BF038", name: "Cancerina gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF039", name: "Cardomariano gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Detox y Antioxidantes", presentation: "Gotas/Extracto" },
  { id: "BF040", name: "Cartilago de Tiburon", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF041", name: "Castaña de Indias gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF042", name: "Chaparro Amargo gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF044", name: "Colex cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Digestiva", presentation: "Cápsulas" },
  { id: "BF046", name: "Cuachalalate caps", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Cápsulas" },
  { id: "BF047", name: "Curcuma caps", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Articulaciones y Movilidad", presentation: "Cápsulas" },
  { id: "BF049", name: "Damiana de california Extracto", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF050", name: "Diente de Leon gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Detox y Antioxidantes", presentation: "Gotas/Extracto" },
  { id: "BF051", name: "Dren-vit gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Detox y Antioxidantes", presentation: "Gotas/Extracto" },
  { id: "BF052", name: "Enebro gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF053", name: "Epilobio gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Masculina", presentation: "Gotas/Extracto" },
  { id: "BF054", name: "Equinacea +VC", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Sistema Inmune" },
  { id: "BF055", name: "Equinacea cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Sistema Inmune", presentation: "Cápsulas" },
  { id: "BF057", name: "Espino Blanco gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF059", name: "Fem Vit gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Femenina", presentation: "Gotas/Extracto" },
  { id: "BF060", name: "Fenogreco cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Cápsulas" },
  { id: "BF062", name: "Galphimia Glauca gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF063", name: "Gayuba gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Urinaria", presentation: "Gotas/Extracto" },
  { id: "BF064", name: "Ginkgo", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Cerebral" },
  { id: "BF065", name: "Gluvit cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Metabolismo", presentation: "Cápsulas" },
  { id: "BF066", name: "Hamamelis", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF069", name: "Hierba de San Juan Gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF070", name: "Hierba del Sapo gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF071", name: "Hinojo gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF073", name: "In-So cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Anti-Estrés y Sueño", presentation: "Cápsulas" },
  { id: "BF074", name: "Jarabe Balsamo de 3 Damianas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Respiratoria", presentation: "Jarabe" },
  { id: "BF075", name: "Jarabe Sauco-vit", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Respiratoria", presentation: "Jarabe" },
  { id: "BF077", name: "Keloz", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF078", name: "Laxil gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Salud Digestiva", presentation: "Gotas/Extracto" },
  { id: "BF079", name: "Levadura de Cerveza cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Cápsulas" },
  { id: "BF081", name: "Malabar gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF082", name: "Mapurite gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF083", name: "Matlali", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF086", name: "Moringa gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF087", name: "Nervit", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Anti-Estrés y Sueño" },
  { id: "BF088", name: "Ortiga Extracto", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF089", name: "Palo azul gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF090", name: "Pelo de Elote gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF091", name: "pervit", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF092", name: "Polvo Cal-Bil", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Polvo" },
  { id: "BF093", name: "Polvo Cal-Ren", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Polvo" },
  { id: "BF095", name: "Ren-VIt gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Detox y Antioxidantes", presentation: "Gotas/Extracto" },
  { id: "BF096", name: "Salvia gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF097", name: "Sayumel gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF098", name: "Sedanlex Caps", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF099", name: "Semilla Fenogreeco", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF100", name: "Té del Corazon", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF102", name: "Tomillo gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales", presentation: "Gotas/Extracto" },
  { id: "BF103", name: "Uña de Gato Peruana cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Articulaciones y Movilidad", presentation: "Cápsulas" },
  { id: "BF105", name: "Uricol", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
  { id: "BF108", name: "Vari Vit gotas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Circulación", presentation: "Gotas/Extracto" },
  { id: "BF109", name: "Varilex cápsulas", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Circulación", presentation: "Cápsulas" },
  { id: "BF110", name: "Vermi-vit", brand: "Biofito", ingredients: ["Extracto herbal natural"], benefits: ["Suplemento natural"], category: "Suplementos Naturales" },
];

// Categorías disponibles para filtrado
export const wellkittCategories = [
  "Salud Femenina",
  "Energía y Rendimiento", 
  "Piel y Belleza",
  "Sistema Inmune",
  "Anti-Estrés y Sueño",
  "Salud Cerebral",
  "Salud Digestiva",
  "Articulaciones y Movilidad",
  "Detox y Antioxidantes",
  "Metabolismo",
  "Control de Peso",
  "Regulación Hormonal",
  "Vitaminas",
  "Aminoácidos",
  "Suplementos Naturales",
  "Salud Masculina",
  "Salud Urinaria",
  "Circulación",
  "Salud Respiratoria"
];

// Función para obtener productos por categoría
export const getProductsByCategory = (category: string): WellkittProduct[] => {
  if (category === "Todas") return wellkittProducts;
  return wellkittProducts.filter(product => product.category === category);
};

// Función para buscar productos por nombre
export const searchProducts = (query: string): WellkittProduct[] => {
  const lowercaseQuery = query.toLowerCase();
  return wellkittProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery)) ||
    product.benefits.some(benefit => benefit.toLowerCase().includes(lowercaseQuery))
  );
};
