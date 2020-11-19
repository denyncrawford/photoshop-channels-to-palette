/* Code by  Mike Hale http://www.ps-scripts.com/bb/viewtopic.php?f=14&t=1802&start=15
with small modification by Vladimir Carrer
*/

const drawShape = (args, color) => {
    
  const doc = app.activeDocument;
  let y = args.length;
  let i = 0;

  var docCoef = doc.resolution / 72;

  args = args.map(arr => {
    return arr.map(coor => {
      return coor / docCoef;
    })
  })
  
  var lineArray = [];
  for (i = 0; i < y; i++) {
      lineArray[i] = new PathPointInfo;
      lineArray[i].kind = PointKind.CORNERPOINT;
      lineArray[i].anchor = args[i];
      lineArray[i].leftDirection = lineArray[i].anchor;
      lineArray[i].rightDirection = lineArray[i].anchor;
  }

  var lineSubPathArray = new SubPathInfo();
  lineSubPathArray.closed = true;
  lineSubPathArray.operation = ShapeOperation.SHAPEADD;
  lineSubPathArray.entireSubPath = lineArray;
  var myPathItem = doc.pathItems.add("myPath", [lineSubPathArray]);
  

  var desc88 = new ActionDescriptor();
  var ref60 = new ActionReference();
  ref60.putClass(stringIDToTypeID("contentLayer"));
  desc88.putReference(charIDToTypeID("null"), ref60);
  var desc89 = new ActionDescriptor();
  var desc90 = new ActionDescriptor();
  var desc91 = new ActionDescriptor();
  desc91.putDouble(charIDToTypeID("Rd  "), color.red); // R
  desc91.putDouble(charIDToTypeID("Grn "), color.green); // G
  desc91.putDouble(charIDToTypeID("Bl  "), color.blue); // B
  var id481 = charIDToTypeID("RGBC");
  desc90.putObject(charIDToTypeID("Clr "), id481, desc91);
  desc89.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc90);
  desc88.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), desc89);
  executeAction(charIDToTypeID("Mk  "), desc88, DialogModes.NO);
  
  myPathItem.remove();
}

let lastpos = 1

const textLayer = ({name, color}) => {
    let layers = app.activeDocument.artLayers;
    let layer = layers.add();
    layer.kind = LayerKind.TEXT;
    let textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = 30;
    textItem.position = [3, lastpos];
    textItem.contents = name;
    let myColor = new SolidColor
    myColor.rgb.red = color.red
    myColor.rgb.green = color.green
    myColor.rgb.blue = color.blue
    textItem.color = myColor
    textItem.width = new UnitValue(100,"mm");
    textItem.height = new UnitValue(10 ,"mm");
    lastpos++
}

export { drawShape, textLayer }