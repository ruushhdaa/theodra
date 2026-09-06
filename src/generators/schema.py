"""
Unified internal event schema for synthetic communication metadata.

See docs/spec.md §1.1 for the full field-by-field rationale. Every field
here is a behavioral signal (timing, frequency, hierarchy, exclusivity) —
never message content. This is the load-bearing design decision of the
whole project: the system is deliberately blind to what was said, only to
the shape of communication.
"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
import uuid


class ChannelType(str, Enum):
    DM = "dm"
    CHANNEL = "channel"
    EMAIL_1TO1 = "email_1to1"
    EMAIL_THREAD = "email_thread"


class RoleLevel(str, Enum):
    IC = "IC"
    MANAGER = "manager"
    SENIOR = "senior"
    JUNIOR = "junior"
    INTERN = "intern"


@dataclass
class CommEvent:
    """One row of the unified schema. See docs/spec.md §1.1."""

    sender_id: str
    receiver_id: str
    channel_type: ChannelType
    timestamp: datetime
    role_level: RoleLevel
    message_length: int
    after_hours_flag: bool
    response_latency_sec: int | None = None
    thread_depth: int = 0
    reaction_count: int | None = None
    frequency_7d: int = 0
    is_1to1_only: bool = False
    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
