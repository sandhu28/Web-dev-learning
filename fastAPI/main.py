from fastapi import FastAPI
from fastapi.params import Body

app = FastAPI()


@app.get('/')  # decorator
def get_user():
    return {"message": "Hello World"}


@app.get('/posts')
def get_posts():
    return {"Data": "This is your posts"}


@app.post("/createPost")
def create_post(payload: dict = Body(...)):
    return {"Message": f"title:{payload['title']} content:{payload['content']}"}
