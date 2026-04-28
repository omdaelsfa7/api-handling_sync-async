from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import asyncio
from datetime import datetime
from typing import List


app = FastAPI(
    title="Restaurant Sync vs Async Demo",
    description="""
    A small teaching API that shows the difference between synchronous and asynchronous behavior.

    Scenario:
    - Two users make restaurant orders.
    - Each order needs time to be delivered.
    - In the sync endpoint, User 2 waits until User 1 finishes everything.
    - In the async endpoint, User 1 orders and leaves, then User 2 orders and leaves,
      and delivery happens later when each order is ready.
    """,
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TimelineEvent(BaseModel):
    time: str
    elapsed_seconds: float
    message: str


class DemoResponse(BaseModel):
    mode: str
    explanation: str
    total_time_seconds: float
    timeline: List[TimelineEvent]


def now_time() -> str:
    return datetime.now().strftime("%H:%M:%S")


def add_event(timeline: list, start_time: float, message: str):
    timeline.append({
        "time": now_time(),
        "elapsed_seconds": round(time.perf_counter() - start_time, 2),
        "message": message,
    })


# =========================
# Sync functions
# =========================

def make_order_sync(user_name: str, timeline: list, start_time: float) -> str:
    add_event(timeline, start_time, f"{user_name} enters the restaurant.")
    add_event(timeline, start_time, f"{user_name} makes an order.")
    time.sleep(1)  # Blocking wait: the server thread is busy here.
    order_id = f"sync-order-for-{user_name.lower()}"
    add_event(timeline, start_time, f"{user_name}'s order is created: {order_id}.")
    return order_id


def deliver_order_sync(user_name: str, order_id: str, timeline: list, start_time: float):
    add_event(timeline, start_time, f"{user_name} waits inside the restaurant until delivery is done.")
    time.sleep(4)  # Blocking delivery.
    add_event(timeline, start_time, f"{user_name}'s order is delivered: {order_id}.")


@app.post("/sync-demo", response_model=DemoResponse, tags=["Sync vs Async"])
def sync_demo():
    """
    Synchronous version.

    User 1:
    - makes order
    - waits until delivery finishes

    Only after User 1 is fully done, User 2 starts.
    """
    start_time = time.perf_counter()
    timeline = []

    user_1 = "User 1"
    user_2 = "User 2"

    order_1 = make_order_sync(user_1, timeline, start_time)
    deliver_order_sync(user_1, order_1, timeline, start_time)

    order_2 = make_order_sync(user_2, timeline, start_time)
    deliver_order_sync(user_2, order_2, timeline, start_time)

    total_time = round(time.perf_counter() - start_time, 2)

    return {
        "mode": "sync",
        "explanation": "In sync mode, User 2 cannot start until User 1 finishes ordering and delivery.",
        "total_time_seconds": total_time,
        "timeline": timeline,
    }


# =========================
# Async functions
# =========================

async def make_order_async(user_name: str, timeline: list, start_time: float) -> str:
    add_event(timeline, start_time, f"{user_name} enters the restaurant.")
    add_event(timeline, start_time, f"{user_name} makes an order.")
    await asyncio.sleep(1)  # Non-blocking wait.
    order_id = f"async-order-for-{user_name.lower().replace(' ', '-')}"
    add_event(timeline, start_time, f"{user_name}'s order is created: {order_id}.")
    add_event(timeline, start_time, f"{user_name} leaves and does not wait for delivery.")
    return order_id


async def deliver_order_async(user_name: str, order_id: str, timeline: list, start_time: float):
    add_event(timeline, start_time, f"Kitchen starts preparing {user_name}'s order in the background.")
    await asyncio.sleep(4)  # Non-blocking delivery preparation.
    add_event(timeline, start_time, f"{user_name}'s order is ready and delivered: {order_id}.")


async def async_customer_flow(user_name: str, timeline: list, start_time: float):
    order_id = await make_order_async(user_name, timeline, start_time)
    await deliver_order_async(user_name, order_id, timeline, start_time)


@app.post("/async-demo", response_model=DemoResponse, tags=["Sync vs Async"])
async def async_demo():
    """
    Asynchronous version.

    User 1:
    - makes order
    - leaves
    - delivery continues in the background

    User 2 can start before User 1 delivery finishes.

    In this demo, the API waits until both deliveries are complete so Swagger can show the full timeline.
    """
    start_time = time.perf_counter()
    timeline = []

    user_1 = "User 1"
    user_2 = "User 2"

    task_1 = asyncio.create_task(async_customer_flow(user_1, timeline, start_time))

    await asyncio.sleep(0.2)  # Small delay just to show User 2 comes after User 1.
    task_2 = asyncio.create_task(async_customer_flow(user_2, timeline, start_time))

    await asyncio.gather(task_1, task_2)

    timeline.sort(key=lambda event: event["elapsed_seconds"])
    total_time = round(time.perf_counter() - start_time, 2)

    return {
        "mode": "async",
        "explanation": "In async mode, users can place orders and leave. Deliveries continue without blocking the next user.",
        "total_time_seconds": total_time,
        "timeline": timeline,
    }


@app.get("/", tags=["Health"])
def root():
    return {
        "message": "Restaurant Sync vs Async Demo API is running.",
        "swagger_url": "/docs",
        "endpoints": ["/sync-demo", "/async-demo"],
    }
