# FASE 4 — Comparación de proveedores DTE/SII para Nüva One
**Objetivo:** elegir con qué proveedor integrar la emisión de Documentos Tributarios Electrónicos (boleta y factura electrónica) antes de escribir una sola línea de la integración — tal como pediste en el plan maestro.

**Restricción clave que no todos los proveedores resuelven bien:** Nüva One no factura a nombre propio. Cada PYME cliente de Nüva One tiene su propio RUT/razón social y debe emitir sus propios DTE ante el SII. Por lo tanto, el criterio #1 no es "¿tiene API?" sino **"¿está pensado para que una plataforma multi-tenant emita en nombre de cientos de RUTs distintos, con su propio proceso de habilitación/certificado digital por empresa?"**. Esto descarta de entrada cualquier solución pensada solo para "una empresa, un RUT".

---

## Candidatos evaluados

| Proveedor | Modelo | Multi-RUT / reseller | API | Sandbox sin cuenta | Precio referencial | Track record |
|---|---|---|---|---|---|---|
| **OpenFactura (Haulmer)** | SaaS + API REST | Sí — <cite index="2-1">permite administrar múltiples empresas sin límite y usuarios ilimitados, cobrando por empresa</cite> | REST/JSON, <cite index="6-1">entorno de desarrollo completamente operativo para integrar sin necesitar cuenta (CAF simulado, timbre no validable)</cite> | Sí | <cite index="2-1">Desde $19.900 anual por empresa para el kit básico, sin cobro adicional por certificar documentos adicionales</cite> | <cite index="7-1">Se posiciona como la factura electrónica #1 de Chile</cite>, ecosistema de integraciones ya construido (Shopify, WooCommerce, Jumpseller, Google Sheets) |
| **LibreDTE (SASCO)** | Librería open-source (self-host) o SaaS "Servicio Plus" | Sí, con matices — self-hosted da control total; el Servicio Plus <cite index="15-1">cobra por empresa, así que 3 empresas son 3 Servicios Plus</cite> | Servicios web, <cite index="14-1">integrable desde cualquier lenguaje incluyendo software privativo</cite> | Parcial (biblioteca open-source disponible en GitHub para pruebas propias) | <cite index="15-1">Precio mensual = MAX(#documentos × 15 + 10.000, 40.000) CLP por empresa</cite> | Proyecto maduro (SASCO), pero orientado más a "una empresa se conecta" que a "una plataforma revende a cientos" |
| **SimpleFactura (Chilesystems)** | API pensada explícitamente para plataformas | Sí — <cite index="21-1">está diseñada para que un CTO o software factory se vea reflejado en un escenario de integración concreto, entregando facturación electrónica chilena a terceros sin que el cliente tenga que levantar certificados, CAF, acuse y soporte operativo desde cero</cite> | REST, <cite index="21-1">permite emitir DTE y boletas de honorarios, recuperar PDF/XML, administrar folios, clientes, productos y sucursales</cite> | No confirmado sin contactar ventas | No publicado — requiere cotización | Posicionamiento explícito B2B2B (plataformas que revenden a sus propios clientes), el más alineado conceptualmente con el modelo de Nüva One |
| **Tupana** | API REST moderna | Sí — <cite index="25-1">multicredencial, administra múltiples empresas (RUTs) desde una sola integración</cite> | <cite index="25-1">REST estándar bien documentado, con webhooks para notificaciones en tiempo real, emisión masiva hasta 200 documentos por llamada y sandbox para pruebas sin afectar el SII real</cite> | Sí (sandbox propio) | No publicado — requiere cotización | Jugador más nuevo; la propuesta técnica (webhooks + sandbox + multicredencial) es la más moderna de las cinco, pero con menos historial que Haulmer/SASCO |
| **Simple API (Chilesystems)** | API/SDK | Parcial — pensada para integración directa, no necesariamente para reventa multi-tenant | <cite index="28-1">API REST y SDK en .NET, consumible desde web, desktop o móvil</cite> | Sí — <cite index="28-1">versión gratuita hasta 500 consultas mensuales, planes pagados hasta 150.000 consultas mensuales</cite> | Freemium + planes por volumen de consultas | Documentación en Postman, orientado a integradores individuales más que a plataformas SaaS |

*(Nota: no confundir con la certificación directa ante el SII usando su portal gratuito — esa vía no tiene API y obliga a operar documento por documento a mano; queda descartada para un SaaS desde el inicio.)*

---

## Recomendación

**Pilotar con OpenFactura (Haulmer) como primera opción, con SimpleFactura y Tupana como candidatos de respaldo/comparación antes de firmar contrato.**

Razones:
1. **Menor riesgo de integración**: es el único de los cinco con un entorno de sandbox público, sin necesidad de cuenta, documentado y ya probado por un ecosistema enorme de integraciones (Shopify, WooCommerce, Jumpseller). Eso significa que Martín puede prototipar la integración completa (emitir boleta/factura de prueba) **antes de pagar nada ni firmar nada**.
2. **Modelo de precio ya pensado para multi-empresa**: cobra por empresa, sin cobro extra por tipo de documento adicional — encaja directo con "cada PYME cliente de Nüva One es una empresa distinta ante el SII".
3. **Es el jugador con más marca y trayectoria** de los cinco — para un producto que recién está construyendo confianza en el mercado chileno, apoyarse en el proveedor de facturación más reconocido reduce fricción en la conversación de venta ("emitimos con Haulmer/OpenFactura" tranquiliza más que un nombre desconocido).

**Antes de comprometerse**, vale la pena una llamada de 30 minutos con SimpleFactura y Tupana — ambos se posicionan explícitamente para el caso "plataforma que revende facturación a sus propios clientes", que es exactamente el caso de Nüva One, y ninguno publica precio de reseller en su sitio (señal de que negocian por volumen, lo cual puede convenir más que el precio público de OpenFactura una vez Nüva One tenga cientos de negocios activos).

## Lo que falta decidir con Martín antes de programar una sola línea (según lo que pediste en FASE 4)
- ¿Volumen esperado de documentos/mes en los primeros 6 meses? (define qué tan importante es el precio por documento vs. el costo fijo por empresa)
- ¿Nüva One absorbe el costo del proveedor DTE dentro del plan Pro, o se cobra aparte como "add-on de facturación electrónica"? (afecta directamente el pricing ya construido en FASE de suscripciones)
- ¿Cada dueño de PYME gestiona su propio certificado digital/firma electrónica, o Nüva One ofrece un flujo asistido? (todos los proveedores requieren un certificado digital vigente del contribuyente — es un paso que no se puede saltar, solo facilitar)
