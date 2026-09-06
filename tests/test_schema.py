"""Tests for the unified synthetic event schema (src/generators/schema.py)."""

from datetime import datetime

from src.generators.schema import ChannelType, CommEvent, RoleLevel


def test_comm_event_creates_with_required_fields():
    event = CommEvent(
        sender_id="EMP_0001",
        receiver_id="EMP_0002",
        channel_type=ChannelType.DM,
        timestamp=datetime(2026, 1, 15, 14, 30),
        role_level=RoleLevel.SENIOR,
        message_length=120,
        after_hours_flag=False,
    )
    assert event.sender_id == "EMP_0001"
    assert event.channel_type == ChannelType.DM
    assert event.event_id  # auto-generated UUID should not be empty


def test_comm_event_defaults():
    event = CommEvent(
        sender_id="EMP_0001",
        receiver_id="EMP_0002",
        channel_type=ChannelType.EMAIL_THREAD,
        timestamp=datetime(2026, 1, 15, 22, 0),
        role_level=RoleLevel.JUNIOR,
        message_length=50,
        after_hours_flag=True,
    )
    assert event.thread_depth == 0
    assert event.is_1to1_only is False
    assert event.reaction_count is None
