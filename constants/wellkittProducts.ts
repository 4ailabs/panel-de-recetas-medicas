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
  { id: "SN16", name: "Oligonato 1", brand: "Soria Natural", ingredients: ["Cobre", "magnesio", "manganeso", "potasio", "cobalto"], benefits: ["Mejora funciones neuromusculares y cardiovasculares"], category: "Articulaciones y Movilidad" },
  { id: "SN17", name: "Oligonato 2", brand: "Soria Natural", ingredients: ["Fósforo", "flúor", "yodo", "azufre"], benefits: ["Salud ósea", "dental", "hormonal"], category: "Control de Peso" },
  { id: "SN18", name: "Oligosor", brand: "Soria Natural", ingredients: ["Azufre", "cobalto", "cobre", "fósforo", "iodo", "litio", "magnesio", "potasio", "zinc"], benefits: ["Remineralización", "modulación neuroendocrina"], category: "Detox y Antioxidantes" },
  { id: "SN19", name: "Resverasor", brand: "Soria Natural", ingredients: ["Resveratrol (extracto de uva negra)"], benefits: ["Antioxidante", "salud cardiovascular", "antiinflamatorio", "neuroprotector"], category: "Sistema Inmune" },
  { id: "SN20", name: "Analis L-Triptófano", brand: "Soria Natural", ingredients: ["L-Lisina", "L-Triptófano"], benefits: ["Precursor de serotonina y melatonina", "regula estado de ánimo"], category: "Anti-Estrés y Sueño", presentation: "60 cápsulas de 500 mg" },
  { id: "SN21", name: "Carnilis", brand: "Soria Natural", ingredients: ["L-Carnitina", "Nitrato de cromo"], benefits: ["Transporte de ácidos grasos", "mejora metabolismo energético", "reduce fatiga"], category: "Energía y Rendimiento", presentation: "60 cápsulas de 500 mg" },
  { id: "SN22", name: "Pro-vit", brand: "Soria Natural", ingredients: ["Zapote blanco (Casimiroa edulis)", "Olivo (Olea europaea)", "Espino blanco (Crataegus monogyna)", "Melisa (Melissa officinalis)", "Maíz estilos (Zea mays)", "Galphimia glauca"], benefits: ["Equilibra hormonas", "calma el sistema nervioso", "mejora el estado de ánimo"], category: "Regulación Hormonal", presentation: "Frasco gotero de 50 ml" },
  { id: "SN23", name: "Sorivid", brand: "Soria Natural", ingredients: ["Vitamina A", "Vitamina B12", "Vitamina C", "Vitamina D", "Vitamina E"], benefits: ["Inmunidad", "visión", "piel", "metabolismo celular"], category: "Vitaminas", presentation: "Cápsulas" },
  { id: "SN24", name: "Totalvid 4", brand: "Soria Natural", ingredients: ["Vitamina C", "Vitamina E", "Vitamina B6", "Vitamina A", "Vitamina B12", "PABA", "Colina", "Hierro", "Zinc", "Inositol", "Niacina", "Manganeso", "Fluoruro"], benefits: ["Complejo multivitamínico completo", "antioxidante", "energía", "inmunidad", "piel", "sistema nervioso"], category: "Vitaminas", presentation: "Cápsulas" },

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
  "Aminoácidos"
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
