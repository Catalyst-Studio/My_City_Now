from fastapi import FastAPI, templating, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

import csv
import jellyfish, json


class searcher:

    def __init__(self):
        self.rows = []
        with open("storage/worldcities.csv", 'r', encoding='cp850') as csvfile:
            csvreader = csv.reader(csvfile)
            self.fields = next(csvreader)

            for row in csvreader:
                self.rows.append(row)

    def search(self, country: str, city: str):
        valid_rows = {}
        times = -1
        for row in self.rows:
            if country.lower() == row[4].lower():
                similarity = jellyfish.jaro_similarity(city.lower(), row[0].lower())
                if similarity >= .85:
                    times = times + 1
                    valid_rows[str(times)] = ({
                        "name": row[0],
                        "country": row[4],
                        "cabr": row[5]
                    })
        print(json.dumps(valid_rows))
        return valid_rows


api = searcher()

templates = templating.Jinja2Templates(directory="templates")

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/view")
async def say_hello(request: Request, city: str = None, country: str = None):
    if not city or not country:
        return RedirectResponse("/")
    return templates.TemplateResponse("viewer.html", {"request": request, "city": city, "country": country})


@app.get("/search")
async def search(city: str, country: str):
    return str(api.search(country=country, city=city)).replace("'", '"')
