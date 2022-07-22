var secondaryNodeId, secondaryNodeIp,
    ipCmd = "ip a | grep -A1 venet0 | grep inet | awk '{print $2}'| sed 's|\/[0-9]*||g' | head -n 2|tail -n 1",
    idCmd = "hostname|awk -F '-' '{print $1}'|grep -o [0-9]*";
resp = jelastic.env.control.ExecCmdByGroup('${@i}', session, "sqldb", toJSON([{ "command": ipCmd, "params": "" }]), false, false, "root");
if (resp.result != 0) { return resp; } else { secondaryNodeIp = resp.responses[0].out; }
resp = jelastic.env.control.ExecCmdByGroup('${@i}', session, "sqldb", toJSON([{ "command": idCmd, "params": "" }]), false, false, "root");
if (resp.result != 0) { return resp; } else { secondaryNodeId = resp.responses[0].out; }
return { result:0, "secondaryNodeIp":secondaryNodeIp, "secondaryNodeId":secondaryNodeId }
