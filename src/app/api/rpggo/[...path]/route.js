import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

// Base URL and Authorization token
const baseURL = 'https://api.rpggo.ai/v2/open/game';

function getAuthToken() {
  return process.env.NEXT_PUBLIC_AUTH_TOKEN;
}

const gameMetaData = async (game_id) => {
  try {
    const result = await axios.post(`${baseURL}/gamemetadata`, {
      game_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    if (!result?.data?.data) {
      return NextResponse.json(
        { code, msg: 'no valid data responsed', data: {} },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { data: result.data.data, code: 0, msg: "success" },
      { status: 200 },
    );
  } catch(error) {
    console.error('Error getting game details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const startGame = async (game_id, session_id) => {
  try {
    const result = await axios.post(`${baseURL}/startgame`, {
      game_id,
      session_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    if (!result?.data) {
      return NextResponse.json(
        { code, msg: 'failed to start the game', data: {} },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { data: result.data.data, code: 0, msg: "success" },
      { status: 200 },
    );
  } catch(error) {
    console.error('Error getting game details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const resumeSession = async (game_id, session_id) => {
  try {
    const result = await axios.post(`${baseURL}/resumesession`, {
      game_id,
      session_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    if (!result?.data) {
      return NextResponse.json(
        { code, msg: 'failed to resume the game', data: {} },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { data: result.data.data, code: 0, msg: "success" },
      { status: 200 },
    );
  } catch(error) {
    console.error('Error getting game details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const chatWithNPC = async (game_id, session_id, character_id, message) => {
  try {
    const message_id = 'msg_' + Math.random().toString(36).substr(2, 9);
    const result = await axios.post(`${baseURL}/chatsse`, {
      game_id,
      session_id,
      character_id,
      message,
      message_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    if (!result?.data) {
      return NextResponse.json(
        { code, msg: 'failed to chat with npc', data: {} },
        { status: 500 },
      );
    }
    var raw_messages  = result.data

    var parsed_msg = parseMessages(raw_messages);
    return NextResponse.json(
      { data: parsed_msg, code: 0, msg: "success" },
      { status: 200 },
    );
  } catch(error) {
    console.error('Error getting game details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function parseMessages(raw_messages){
  var data_array = raw_messages.split('\n');

  for (let i = 0; i < data_array.length; i++) {
      if (data_array[i].startsWith("data:")) {
          var start_index = data_array[i].indexOf("{");
          var last_index = data_array[i].lastIndexOf("}");
          var sub_str = data_array[i].substring(start_index, last_index + 1);
 
          var json_obj = JSON.parse(sub_str);
          if (json_obj.data.result.character_type == "common_npc") {
              return json_obj.data.result;
          }
      }
  }
  return "{'text': 'No NPC response'}";
}

async function handler(req, res) {
  const { params } = res;
  const path = params.path.join("/");
  console.log('path ====>', path, params.path);
  try {
    if (path === 'gamemetadata') {
      const {
        game_id,
      } = await req.json();
      return await gameMetaData(game_id);
    }

    if (path === 'startgame') {
      const {
        game_id,
        session_id,
      } = await req.json();
      return await startGame(game_id, session_id);
    }

    if (path === 'resumesession') {
      const {
        game_id,
        session_id,
      } = await req.json();
      return await resumeSession(game_id, session_id);
    }

    if (path === 'chatwithnpc') {
      const {
        game_id,
        session_id,
        character_id,
        message,
      } = await req.json();
      return await chatWithNPC(game_id, session_id, character_id, message);
    } 
  } catch(error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
