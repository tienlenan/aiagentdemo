"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function N8nHelper() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          n8n Setup Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>n8n Webhook Setup Guide</DialogTitle>
          <DialogDescription>
            Follow these steps to set up your n8n workflow to work with this chatbot
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Setup</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Setup</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">1. Create a new n8n workflow</h3>
              <p className="text-sm text-muted-foreground">Start by creating a new workflow in your n8n instance.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">2. Add a Webhook node</h3>
              <p className="text-sm text-muted-foreground">
                Add a Webhook node as the trigger for your workflow. Configure it as follows:
              </p>
              <ul className="list-disc pl-6 text-sm">
                <li>Authentication: None (for testing) or Basic Auth for production</li>
                <li>HTTP Method: POST</li>
                <li>Path: Choose a unique path (e.g., /chatbot-webhook)</li>
                <li>Response Mode: Last Node</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">3. Add processing nodes</h3>
              <p className="text-sm text-muted-foreground">Add nodes to process the incoming message. For example:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>HTTP Request nodes to call external APIs</li>
                <li>Function nodes to transform data</li>
                <li>AI nodes like OpenAI or other services</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">4. Add a Respond to Webhook node</h3>
              <p className="text-sm text-muted-foreground">
                Add a "Respond to Webhook" node at the end of your workflow with this structure:
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                {`{
  "response": "Your response message here"
}`}
              </pre>
              <p className="text-sm text-muted-foreground">
                The "response" field is required for the chatbot to display the message.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">5. Activate and copy webhook URL</h3>
              <p className="text-sm text-muted-foreground">
                Activate your workflow and copy the webhook URL from the Webhook node. Paste this URL into the chatbot
                settings.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Using environment variables</h3>
              <p className="text-sm text-muted-foreground">
                For security, use environment variables in n8n for API keys and sensitive data.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Error handling</h3>
              <p className="text-sm text-muted-foreground">
                Add Error Trigger nodes to handle errors in your workflow:
              </p>
              <ul className="list-disc pl-6 text-sm">
                <li>Connect an Error Trigger node to nodes that might fail</li>
                <li>Add a "Respond to Webhook" node after the Error Trigger</li>
                <li>Return a helpful error message in the response</li>
              </ul>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                {`{
  "response": "Sorry, I encountered an error: " + $input.all()[0].error.message
}`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">CORS configuration</h3>
              <p className="text-sm text-muted-foreground">
                If your n8n instance is on a different domain than this app, you need to configure CORS:
              </p>
              <ol className="list-decimal pl-6 text-sm">
                <li>In your n8n instance, go to Settings `${'>'}` API</li>
                <li>Add your app's domain to the CORS allowed domains</li>
                <li>Restart n8n for the changes to take effect</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">500 Internal Server Error</h3>
              <p className="text-sm text-muted-foreground">If you're getting a 500 error, check these common issues:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Check your n8n execution logs for detailed error messages</li>
                <li>Verify all API credentials and tokens are valid</li>
                <li>Ensure all required fields in your workflow are populated</li>
                <li>Check for syntax errors in Function nodes</li>
                <li>Verify your "Respond to Webhook" node returns valid JSON</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">CORS Errors</h3>
              <p className="text-sm text-muted-foreground">If you see CORS errors in the browser console:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Ensure your n8n instance has CORS properly configured</li>
                <li>Try using a browser extension to temporarily disable CORS for testing</li>
                <li>Consider hosting both the app and n8n on the same domain</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Invalid JSON Response</h3>
              <p className="text-sm text-muted-foreground">If you're getting "Invalid JSON" errors:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Ensure your "Respond to Webhook" node returns valid JSON</li>
                <li>Check for extra commas or syntax errors in your JSON</li>
                <li>Verify the response includes the "response" field</li>
                <li>Use a JSON validator to check your response format</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Connection Timeouts</h3>
              <p className="text-sm text-muted-foreground">If requests are timing out:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Check if your n8n instance is running and accessible</li>
                <li>Verify network connectivity between your app and n8n</li>
                <li>Check if any firewall or security rules are blocking connections</li>
                <li>Consider increasing timeout settings in your n8n instance</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

