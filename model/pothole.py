from ultralytics import YOLO
import cv2
import cvzone
import math


img_path = r"./images/potholeNo.jpg"
img = cv2.imread(img_path)


model = YOLO(r"./models/pothole.pt")


classNames = ["pothole"]

results = model(img, stream=True)
for r in results:
    boxes = r.boxes
    for box in boxes:
       
        x1, y1, x2, y2 = box.xyxy[0]
        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

        
        cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

        
        conf = math.ceil((box.conf[0] * 100)) / 100
        print(conf)

       
        cls = int(box.cls[0])
        cvzone.putTextRect(img, f'{classNames[cls]} {conf}', (max(0, x1), max(35, y1)))


cv2.imshow("Detected Image", img)


output_path = r"./images/detected.jpg"  
cv2.imwrite(output_path, img)
print(f"Detected image saved to {output_path}")

cv2.waitKey(0)
cv2.destroyAllWindows()
