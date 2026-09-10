from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether, Image
)

OUT = "output/pdf/Propuesta_Comercial_RIO_Catalogo_B2B.pdf"
LOGO = r"C:\Users\2001m\Downloads\icon_50_50.png"

NAVY = colors.HexColor("#181411")
BLUE = colors.HexColor("#27211D")
TEAL = colors.HexColor("#FF613B")
INK = colors.HexColor("#241D19")
MUTED = colors.HexColor("#766A63")
PAPER = colors.HexColor("#FCF8F5")
LINE = colors.HexColor("#E7DDD7")
GREEN = colors.HexColor("#1F7A5A")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverKicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=TEAL, spaceAfter=14, tracking=1.2))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=30, leading=35, textColor=colors.white, spaceAfter=14))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["Normal"], fontName="Helvetica", fontSize=13, leading=19, textColor=colors.HexColor("#D9E2EC")))
styles.add(ParagraphStyle(name="H1Rio", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=21, leading=26, textColor=NAVY, spaceBefore=2, spaceAfter=12))
styles.add(ParagraphStyle(name="H2Rio", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=colors.HexColor("#C7492B"), spaceBefore=12, spaceAfter=6))
styles.add(ParagraphStyle(name="BodyRio", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.2, leading=15, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name="SmallRio", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.6, leading=12, textColor=MUTED))
styles.add(ParagraphStyle(name="TableHead", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=8.6, leading=11, textColor=colors.white))
styles.add(ParagraphStyle(name="TableCell", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.6, leading=11.5, textColor=INK))
styles.add(ParagraphStyle(name="TableCellBold", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=8.6, leading=11.5, textColor=NAVY))
styles.add(ParagraphStyle(name="Callout", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=10.3, leading=15, textColor=NAVY))

def p(text, style="BodyRio"):
    return Paragraph(text, styles[style])

def bullet(text):
    return Paragraph(f"<font color='#176B87'>•</font>&nbsp;&nbsp;{text}", styles["BodyRio"])

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(TEAL)
    canvas.line(1.7 * cm, 1.25 * cm, 19.3 * cm, 1.25 * cm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(INK)
    canvas.drawString(1.7 * cm, 0.8 * cm, "M. - Propuesta funcional para RIO")
    canvas.drawRightString(19.3 * cm, 0.8 * cm, f"Pagina {doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=1.7 * cm, rightMargin=1.7 * cm, topMargin=1.55 * cm, bottomMargin=1.65 * cm)
story = []

logo = Image(LOGO, width=1.35*cm, height=1.35*cm)
cover = Table([[logo, p("PROPUESTA COMERCIAL", "CoverKicker")], ["", p("Catalogo B2B privado y panel operativo", "CoverTitle")], ["", p("Una primera version funcional para la bodega RIO, enfocada en pedidos de oro laminado, control de reservas y preparacion sin cambiar el metodo de trabajo actual.", "CoverSub")]], colWidths=[2.25 * cm, 15.35 * cm], rowHeights=[1.65 * cm, 2.35 * cm, 3.1 * cm])
cover.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,-1), NAVY), ("LEFTPADDING", (0,0), (-1,-1), 0.8*cm), ("RIGHTPADDING", (0,0), (-1,-1), 0.85*cm), ("TOPPADDING", (0,0), (-1,-1), 0.55*cm), ("BOTTOMPADDING", (0,0), (-1,-1), 0.55*cm), ("VALIGN", (0,0), (-1,-1), "MIDDLE")]))
story += [Spacer(1, 2.0*cm), cover, Spacer(1, 1.0*cm)]
story += [p("Objetivo", "H1Rio"), p("Crear una herramienta privada para que los clientes mayoristas de RIO consulten el catalogo de oro laminado y envien pedidos, mientras la bodega controla inventario, prepara los pedidos con su hoja impresa habitual y reduce errores de cantidad antes del despacho.")]

value = Table([
    [p("Para el cliente mayorista", "TableHead"), p("Para la bodega RIO", "TableHead")],
    [p("Catalogo privado desde celular, carrito sencillo, historial y pedidos sin depender de mensajes dispersos.", "TableCell"), p("Pedidos centralizados, inventario reservado desde el primer envio y control de preparacion antes de empacar.", "TableCell")],
], colWidths=[8.45*cm, 8.45*cm])
value.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), NAVY), ("BACKGROUND", (0,1), (-1,1), PAPER), ("GRID", (0,0), (-1,-1), .45, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 12), ("RIGHTPADDING", (0,0), (-1,-1), 12), ("TOPPADDING", (0,0), (-1,-1), 10), ("BOTTOMPADDING", (0,0), (-1,-1), 12)]))
story += [Spacer(1, 8), value, Spacer(1, 14), p("Alcance de la primera muestra", "H2Rio"), bullet("Demo navegable con datos ficticios, para validar pantallas, flujo y forma de trabajo antes de conectar una base de datos real."), bullet("Disenada primero para telefono en el catalogo y para computador en el panel de bodega."), bullet("No incluye pagos en linea, despliegue publico, base de datos real ni integraciones externas en esta primera muestra.")]
story.append(PageBreak())

story += [p("1. Lo que vera el cliente mayorista", "H1Rio"), p("El cliente tendra una experiencia parecida a una aplicacion de compras, pero solo para compradores previamente autorizados.")]
client_rows = [
    [p("Funcion", "TableHead"), p("Como le ayuda al cliente", "TableHead")],
    [p("Acceso privado", "TableCellBold"), p("Pantalla de acceso para usuarios creados por RIO. La muestra simulara este acceso y las vistas protegidas.", "TableCell")],
    [p("Catalogo de oro laminado", "TableCellBold"), p("Productos con foto, referencia, nombre, precio de ejemplo y aviso de 'Pocas unidades' sin mostrar el inventario exacto.", "TableCell")],
    [p("Busqueda y navegacion movil", "TableCellBold"), p("Busqueda de referencias y barra inferior para ir a catalogo, carrito y perfil con una mano.", "TableCell")],
    [p("Carrito", "TableCellBold"), p("Agregar o quitar referencias y cambiar cantidades. El diseño mostrara limites simulados de inventario.", "TableCell")],
    [p("Enviar pedido", "TableCellBold"), p("Al enviarlo, el pedido pasa a estado reservado: las unidades quedan apartadas para ese cliente.", "TableCell")],
    [p("Modificar pedido pendiente", "TableCellBold"), p("Mientras RIO no haya iniciado la preparacion, el cliente puede agregar o quitar referencias de su pedido reservado.", "TableCell")],
    [p("Perfil e historial", "TableCellBold"), p("Datos de envio y consulta de pedidos anteriores con sus referencias y cantidades.", "TableCell")],
]
ct = Table(client_rows, colWidths=[4.5*cm, 12.4*cm], repeatRows=1)
ct.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), NAVY), ("BACKGROUND", (0,1), (-1,-1), colors.white), ("GRID", (0,0), (-1,-1), .35, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 9), ("RIGHTPADDING", (0,0), (-1,-1), 9), ("TOPPADDING", (0,0), (-1,-1), 7), ("BOTTOMPADDING", (0,0), (-1,-1), 7)]))
story += [ct, Spacer(1, 12), p("Regla clave de inventario", "H2Rio"), p("El envio de un pedido aparta sus unidades. Si se cancela, se libera la reserva. Esto evita que dos clientes reciban la misma ultima unidad.", "Callout")]
story.append(PageBreak())

story += [p("2. Lo que hara la bodega RIO", "H1Rio"), p("El panel no reemplaza la forma actual de imprimir y preparar pedidos. La organiza y agrega una confirmacion digital al final de la revision.")]
admin_rows = [
    [p("Modulo", "TableHead"), p("Funcion incluida en la muestra", "TableHead")],
    [p("Bandeja de pedidos", "TableCellBold"), p("Lista de pedidos nuevos, pendientes, en preparacion, verificados, empacados y despachados. Busqueda por cliente y consulta de pedidos antiguos.", "TableCell")],
    [p("Detalle e impresion", "TableCellBold"), p("Hoja imprimible con numero de pedido, cliente, referencias, fotos, cantidades grandes y datos de envio. Sirve como guia de bodega.", "TableCell")],
    [p("Estados de pedido", "TableCellBold"), p("Cambios visuales entre Reservado, Confirmado, En preparacion, Pendiente de verificacion, Verificado, Empacado y Despachado.", "TableCell")],
    [p("Checklist de verificacion", "TableCellBold"), p("Al terminar de sacar y marcar las bolsas a mano, una persona compara cada bolsa contra la lista digital y confirma referencia por referencia.", "TableCell")],
    [p("Control de diferencias", "TableCellBold"), p("Una linea puede reportarse como cantidad faltante, referencia equivocada o producto danado. El pedido no se cierra como verificado sin resolver el caso.", "TableCell")],
    [p("Inventario y clientes", "TableCellBold"), p("Pantallas de ejemplo para productos, stock, clientes, descuentos y alertas de pocas unidades. La carga CSV y las imagenes se presentaran como flujo visual.", "TableCell")],
]
at = Table(admin_rows, colWidths=[4.5*cm, 12.4*cm], repeatRows=1)
at.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), NAVY), ("BACKGROUND", (0,1), (-1,-1), PAPER), ("GRID", (0,0), (-1,-1), .35, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 9), ("RIGHTPADDING", (0,0), (-1,-1), 9), ("TOPPADDING", (0,0), (-1,-1), 7), ("BOTTOMPADDING", (0,0), (-1,-1), 7)]))
story += [at, Spacer(1, 12), p("Proceso de preparacion propuesto", "H2Rio")]
flow = Table([[p("1. Se confirma", "TableCellBold"), p("2. Se imprime", "TableCellBold"), p("3. Se prepara", "TableCellBold"), p("4. Se verifica", "TableCellBold"), p("5. Se despacha", "TableCellBold")], [p("RIO confirma el pedido con el cliente.", "TableCell"), p("Se imprime la hoja de preparacion.", "TableCell"), p("Bodega saca y marca cada bolsa a mano.", "TableCell"), p("Se coteja cada bolsa con el checklist digital.", "TableCell"), p("Se empaca y se registra el envio.", "TableCell")]], colWidths=[3.38*cm]*5)
flow.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.HexColor("#FFE1D8")), ("GRID", (0,0), (-1,-1), .35, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 7), ("RIGHTPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 7), ("BOTTOMPADDING", (0,0), (-1,-1), 7)]))
story += [flow]
story.append(PageBreak())

story += [p("3. Entrega, limites y siguiente paso", "H1Rio"), p("La primera entrega sirve para que RIO pueda recorrer el sistema, probar escenarios de pedido y validar si el flujo se ajusta a la bodega antes de invertir en la version conectada a datos reales.")]
story += [p("Entregable de esta etapa", "H2Rio"), bullet("Interfaz navegable de cliente y panel administrativo con datos ficticios de oro laminado."), bullet("Carrito, pedido reservado, modificacion de pedido pendiente, estados, impresion y checklist de verificacion simulados."), bullet("Diseño responsive para telefono y computador."), bullet("Reunion de revision para recoger ajustes operativos antes de la fase real.")]
story += [p("Fuera de alcance de esta primera muestra", "H2Rio"), bullet("Base de datos, cuentas reales, invitaciones, inventario real, precios reales y reservas reales."), bullet("Integracion con WhatsApp, correo, transportadora, pagos, lectores o codigos de barras."), bullet("Despliegue publico y configuracion de dominio.")]
story += [p("Proxima fase sugerida", "H2Rio"), p("Una vez aprobada la muestra, se implementarian autenticacion privada, base de datos, permisos por rol, inventario reservado, carga masiva de productos, imagenes, historial y el panel operativo conectado a la bodega.")]

commercial = Table([
    [p("Inversion", "TableHead"), p("Cronograma", "TableHead"), p("Inicio", "TableHead")],
    [p("Por definir despues de validar el alcance final y las prioridades de RIO.", "TableCell"), p("Por definir segun el numero de pantallas, ajustes de diseno y rondas de revision acordadas.", "TableCell"), p("Tras aprobacion de la propuesta y entrega de logo, referencias e imagenes de ejemplo.", "TableCell")],
], colWidths=[5.63*cm]*3)
commercial.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), NAVY), ("BACKGROUND", (0,1), (-1,1), PAPER), ("GRID", (0,0), (-1,-1), .4, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 10), ("RIGHTPADDING", (0,0), (-1,-1), 10), ("TOPPADDING", (0,0), (-1,-1), 9), ("BOTTOMPADDING", (0,0), (-1,-1), 10)]))
story += [Spacer(1, 15), commercial, Spacer(1, 18), p("Aprobacion de alcance", "H2Rio"), p("Esta propuesta describe una primera muestra funcional. Antes de iniciar la version productiva se validaran el catalogo real, precios, usuarios, responsables de bodega, politica de cancelacion de reservas y reglas definitivas de envio.")]

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
